import React, {Component} from 'react'

import TypeaheadResultsList from './TypeaheadResultsList';

export default class Typeahead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: -1
    };
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      if (child) {
        if (child.type === TypeaheadResultsList) {
          return React.cloneElement(child, {
            highlightedIndex: this.state.highlightedIndex
          });
        }
      }
      return child;
    });
    return <pure-typeahead>{children}</pure-typeahead>
  }
}
