import React, {Component} from 'react'
import TypeaheadResult from './TypeaheadResult'

export default class TypeaheadResultsList extends Component {

  render() {
    let currentIndex = -1;
    const resultValues = [];
    const children = React.Children.map(this.props.children, child => {
      if (child && child.type === TypeaheadResult) {
        // scope the index to avoid closure problems
        const idx = currentIndex = currentIndex + 1;
        resultValues.push(child.props.value);
        return React.cloneElement(child, {
          isHighlighted: idx === this.props.highlightedIndex,
          _onSelect: (value) => { this.props._onSelect(value); },
        })
      }
      return child;
    });
    this.props.onResultsUpdate(resultValues);
    return <typeahead-results-list class={this.props.className}>
      {children}
    </typeahead-results-list>
  }
}
