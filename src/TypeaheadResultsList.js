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
    const { children } = this.props;
    return <typeahead-results-list>
      {children}
    </typeahead-results-list>
  }
}
