import React, {Component} from 'react'

export default class TypeaheadResult extends Component {
  render() {
    const { children } = this.props;
    return <typeahead-result>{children}</typeahead-result>
  }
}
