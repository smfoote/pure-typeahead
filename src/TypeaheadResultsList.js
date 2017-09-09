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
