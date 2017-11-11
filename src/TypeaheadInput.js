import React, {Component} from 'react'

const noop = () =>{};

export default class TypeaheadInput extends Component {
  static defaultProps = {
    onKeyDown: noop,
    onBlur: noop,
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
        this.props.enterKeyPressed();
        break;
      case 'Escape':
        this.props.escapeKeyPressed();
        break;
    }
    this.props.onKeyDown(evt);
  }

  render() {
    const { children } = this.props;
    return (
      <input
        className={this.props.className}
        type={this.props.type || 'text'}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={(evt) => this.onChange(evt)}
        onKeyDown={(evt) => this.onKeyDown(evt)}
        onKeyUp={this.props.onKeyUp}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
      />)
  }
}
