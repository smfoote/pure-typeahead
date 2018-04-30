import React, {Component} from 'react'

const noop = () =>{};

export default class TypeaheadInput extends Component {
  static defaultProps = {
    onKeyDown: noop,
    onFocus: noop,
    onKeyUp: noop,
  }

  onChange(evt) {
    this.props.onChange(evt);
  }

  onKeyDown(evt) {
    const { key } = evt;
    switch(key) {
      case 'ArrowDown':
      case 'ArrowUp':
        evt.preventDefault();
        this.props.arrowKeyPressed(key);
        break;
      case 'Enter':
        this.props.enterKeyPressed(evt);
        break;
      case 'Escape':
        this.props.escapeKeyPressed();
        break;
    }
    this.props.onKeyDown(evt);
  }

  focus() {
    this.inputRef.focus();
  }

  render() {
    const { children } = this.props;
    return (
      <input
        ref={input => this.inputRef = input}
        id={this.props.id}
        className={this.props.className}
        type={this.props.type || 'text'}
        placeholder={this.props.placeholder}
        value={this.props.value}
        autoComplete="off"
        onChange={(evt) => this.onChange(evt)}
        onKeyDown={(evt) => this.onKeyDown(evt)}
        onKeyUp={this.props.onKeyUp}
        onFocus={this.props.onFocus}
      />)
  }
}
