import React, {Component} from 'react'

export default class TypeaheadInput extends Component {
  onChange(evt) {
    this.props.onChange(evt.target.value);
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

  focus() {
    this.input.focus();
  }

  render() {
    const { children } = this.props;
    return (
      <input
        ref={ref => this.input = ref}
        type={this.props.type || 'text'}
        placeholder={this.props.placeholder}
        onChange={(evt) => this.onChange(evt)}
        onKeyDown={(evt) => this.onKeyDown(evt)}
      />)
  }
}
