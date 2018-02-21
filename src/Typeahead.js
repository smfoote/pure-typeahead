import React, {Component} from 'react'

import TypeaheadResultsList from './TypeaheadResultsList';
import TypeaheadInput from './TypeaheadInput';

const dirMap = {
  'ArrowDown': 1,
  'ArrowUp': -1
};

export default class Typeahead extends Component {
  static defaultProps = {
    onBlur: () => {},
    onDismiss: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: -1
    };
  }

  navigateList = (dir) => {
    const count = this.resultsValues.length;
    const { highlightedIndex } = this.state;
    this.updateHighlightedIndex(
      (highlightedIndex + dirMap[dir] + count) % count
    );
  }

  updateHighlightedIndex = (highlightedIndex) => {
    this.setState({ highlightedIndex });
  }

  enterKeyPressed = (evt) => {
    // If a result is highlighted, select it
    if (this.state.highlightedIndex !== -1) {
      evt.preventDefault();
      this.selectHighlightedResult();
      // Reset highlighted index
      this.setState({highlightedIndex: -1});
    }
  }

  selectHighlightedResult = () => {
    this.select(this.resultsValues[this.state.highlightedIndex]);
  }

  select = (value) => {
    this.props.onSelect(value);
  }

  dismissTypeahead = () => {
    this.props.onDismiss();
  }

  onBlur = (evt) => {
    const { relatedTarget } = evt;
    if (!relatedTarget || !this.element.contains(relatedTarget)) {
      this.props.onBlur(evt);
    }
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      if (child) {
        if (child.type === TypeaheadResultsList) {
          return React.cloneElement(child, {
            highlightedIndex: this.state.highlightedIndex,
            updateHighlightedIndex: this.updateHighlightedIndex,
            onResultsUpdate: values => { this.resultsValues = values; },
            _onSelect: (value) => { this.select(value); }
          });
        } else if (child.type === TypeaheadInput) {
          return React.cloneElement(child, {
            arrowKeyPressed: this.navigateList,
            enterKeyPressed: this.enterKeyPressed,
            escapeKeyPressed: this.dismissTypeahead
          });
        }
      }
      return child;
    });
    return <pure-typeahead
      class={this.props.className}
      onBlur={this.onBlur}
      ref={ref => this.element = ref}
    >{children}</pure-typeahead>
  }
}
