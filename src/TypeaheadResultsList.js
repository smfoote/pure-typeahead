import React, {Component} from 'react'

export default class TypeaheadResultsList extends Component {
  render() {
    const { children } = this.props;
    return <typeahead-results-list>{children}</typeahead-results-list>
  }
}
