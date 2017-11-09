import React, {Component} from 'react'

export default class TypeaheadInput extends Component {
  onChange(evt) {
    this.props.onChange(evt);
  }

  onKeyDown(evt) {
    const { key } = evt;
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      evt.preventDefault();
      this.props.arrowKeyPressed(key);
    } else if (key === 'Enter') {
      this.props.enterKeyPressed();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <input
        type={this.props.type || 'text'}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={(evt) => this.onChange(evt)}
        onKeyDown={(evt) => this.onKeyDown(evt)}
      />)
  }
}
