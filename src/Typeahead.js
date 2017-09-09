import React, {Component} from 'react'

import TypeaheadResultsList from './TypeaheadResultsList';
import TypeaheadInput from './TypeaheadInput';

export default class Typeahead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: -1
    };
  }

  navigateList(dir) {
    this.resultsList.navigateList(dir);
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      if (child) {
        if (child.type === TypeaheadResultsList) {
          return React.cloneElement(child, {
            highlightedIndex: this.state.highlightedIndex,
            ref: (ref => this.resultsList = ref)
          });
        } else if (child.type === TypeaheadInput) {
          return React.cloneElement(child, {
            arrowKeyPressed: this.navigateList.bind(this)
          });
        }
      }
      return child;
    });
    return <pure-typeahead>{children}</pure-typeahead>
  }
}
