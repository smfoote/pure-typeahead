import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>pure-typeahead Demo</h1>

      <Typeahead>
        <TypeaheadInput onChange={()=>{}}/>
        <TypeaheadResultsList>
          <TypeaheadResult onSelect={()=>{}}></TypeaheadResult>
        </TypeaheadResultsList>
      </Typeahead>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
