import React, {Component} from 'react'

export default class TypeaheadResult extends Component {
  render() {
    const { children } = this.props;
    return (
      <typeahead-result
        class={this.props.isHighlighted ? 'highlighted' : null}
      >
        {children}
      </typeahead-result>
    );
  }
}
