import React, {Component} from 'react'
import {render} from 'react-dom'

import Typeahead from '../../src/Typeahead';
import TypeaheadInput from '../../src/TypeaheadInput';
import TypeaheadResultsList from '../../src/TypeaheadResultsList';
import TypeaheadResult from '../../src/TypeaheadResult';

import Styles from '../../src/styles';

class Demo extends Component {
  render() {
    return <div>
      <h1>pure-typeahead Demo</h1>

      <Typeahead>
        <TypeaheadInput onChange={()=>{}}/>
        <TypeaheadResultsList>
          <h3>Dogs</h3>
          <TypeaheadResult onSelect={()=>{}}>Puppy</TypeaheadResult>
          <TypeaheadResult onSelect={()=>{}}>Beagle</TypeaheadResult>
          <h3>Cats</h3>
          <TypeaheadResult onSelect={()=>{}}>Alley</TypeaheadResult>
          <TypeaheadResult onSelect={()=>{}}>Tabby</TypeaheadResult>
        </TypeaheadResultsList>
      </Typeahead>
      <Styles/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
