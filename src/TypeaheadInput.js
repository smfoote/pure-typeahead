import React, {Component} from 'react'

export default class TypeaheadInput extends Component {
  onChange(evt) {
    this.props.onChange(evt.target.value);
  }
  render() {
    const { children } = this.props;
    return (
      <input
        type={this.props.type || 'text'}
        placeholder={this.props.placeholder}
        onChange={(evt) => this.onChange(evt)}
      />)
  }
}
