import React, {Component} from 'react'
import {render} from 'react-dom'

import Typeahead from '../../src/Typeahead';
import TypeaheadInput from '../../src/TypeaheadInput';
import TypeaheadResultsList from '../../src/TypeaheadResultsList';
import TypeaheadResult from '../../src/TypeaheadResult';

import Styles from '../../src/styles';

class Demo extends Component {
  typeaheadInputChange(str) {
    console.log(str);
  }

  resultSelected(result) {
    console.log(result);
  }

  render() {
    return <div>
      <h1>pure-typeahead Demo</h1>

      <Typeahead>
        <TypeaheadInput onChange={(str)=> this.typeaheadInputChange(str)}/>
        <TypeaheadResultsList>
          <h3>Dogs</h3>
          <TypeaheadResult onSelect={()=>{this.resultSelected('Puppy')}}>Puppy</TypeaheadResult>
          <TypeaheadResult onSelect={()=>{this.resultSelected('Beagle')}}>Beagle</TypeaheadResult>
          <h3>Cats</h3>
          <TypeaheadResult onSelect={()=>{this.resultSelected('Alley cat')}}>Alley</TypeaheadResult>
          <TypeaheadResult onSelect={()=>{this.resultSelected('Tabby cat')}}>Tabby</TypeaheadResult>
        </TypeaheadResultsList>
      </Typeahead>
      <Styles/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
