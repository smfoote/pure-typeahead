import React, {Component} from 'react'

export default class Typeahead extends Component {
  render() {
    const { children } = this.props;
    return <pure-typeahead>{children}</pure-typeahead>
  }
}
