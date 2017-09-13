import React, {Component} from 'react'

export default class TypeaheadResult extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isHighlighted && !this.props.isHighlighted) {
      this.onHighlight();
    }
  }

  onHighlight() {
    if (typeof this.props.onHighlight === 'function') {
      this.props.onHighlight();
    }
  }

  select() {
    this.props.onSelect();
  }

  render() {
    const { children } = this.props;
    return (
      <typeahead-result
        onClick={() => this.select()}
        class={this.props.isHighlighted ? 'highlighted' : null}
      >
        {children}
      </typeahead-result>
    );
  }
}
