import React, {Component} from 'react'

export default class TypeaheadResult extends Component {
  select() {
    this.props.onSelect();
  }

  render() {
    const { children } = this.props;
    return (
      <typeahead-result
        onClick={() => this.select()}
        class={this.props.isHighlighted ? 'typeahead-highlighted' : null}
      >
        {children}
      </typeahead-result>
    );
  }
}
