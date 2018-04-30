import React, {Component} from 'react'
import TypeaheadResult from './TypeaheadResult'

const dirMap = {
  'ArrowDown': 1,
  'ArrowUp': -1
};

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

  navigateList(dir) {
    const count = this.countResults();
    const { highlightedIndex } = this.props;
    this.props.updateHighlightedIndex(
      (highlightedIndex + dirMap[dir] + count) % count
    );
  }

  selectResult(idx) {
    this[`result${idx}`].select();
  }

  render() {
    let currentIndex = -1;
    const children = React.Children.map(this.props.children, child => {
      if (child && child.type === TypeaheadResult) {
        // scope the index to avoid closure problems
        const idx = currentIndex = currentIndex + 1;
        return React.cloneElement(child, {
          isHighlighted: idx === this.props.highlightedIndex,
          ref: (ref => this[`result${idx}`] = ref)
        })
      }
      return child;
    });
    return <typeahead-results-list class={this.props.className}>
      {children}
    </typeahead-results-list>
  }
}
