import React, {Component} from 'react'

export default class TypeaheadResult extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isHighlighted && !this.props.isHighlighted) {
      this.onHighlight();
    }
  }

  onHighlight = () => {
    if (typeof this.props.onHighlight === 'function') {
      this.props.onHighlight();
    }
  }

  select = () => {
    this.props.onSelect();
  }

  render() {
    const { children, isHighlighted } = this.props;
    const highlightedClass = isHighlighted ? ['typeahead-highlighted'] : [];
    const classes = [this.props.className].concat(highlightedClass).join(' ');
    return (
      <typeahead-result
        onClick={this.select}
        tabindex="-1"
        class={classes}
      >
        {children}
      </typeahead-result>
    );
  }
}
