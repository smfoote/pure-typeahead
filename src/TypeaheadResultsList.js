import React, {Component} from 'react'
import TypeaheadResult from './TypeaheadResult'

export default class TypeaheadResultsList extends Component {

  countResults() {
    let resultsCount = 0;
    React.Children.forEach(this.props.children, child => {
      if (child && child.type === TypeaheadResult) {
        resultsCount++;
      }
    });
    return resultsCount;
  }

  render() {
    let currentIndex = -1;
    const children = React.Children.map(this.props.children, child => {
      if (child && child.type === TypeaheadResult) {
        currentIndex++;
        return React.cloneElement(child, {
          isHighlighted: currentIndex === this.props.highlightedIndex
        })
      }
      return child;
    });
    return <typeahead-results-list>
      {children}
    </typeahead-results-list>
  }
}
