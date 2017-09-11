import React, {Component} from 'react'
import {render} from 'react-dom'

import { cities } from './cities';
import Typeahead from '../../src/Typeahead';
import TypeaheadInput from '../../src/TypeaheadInput';
import TypeaheadResultsList from '../../src/TypeaheadResultsList';
import TypeaheadResult from '../../src/TypeaheadResult';

import Styles from '../../src/styles';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      visibleResults: []
    }
  }
  typeaheadInputChange(str) {
    const { results } = this.state;
    let visibleResults = [];
    if (str) {
      if (results.hasOwnProperty(str)) {
        visibleResults = results[str];
      } else {
        visibleResults = cities.filter(
          city => city.name.match(new RegExp(str, 'i'))
        );
        this.setState({
          results: {
            ...results,
            [str]: visibleResults
          }
        })
      }
    }
    this.setState({
      visibleResults
    });
  }

  resultSelected(result) {
    this.setState({
      selectedCity: result,
      visibleResults: []
    })
  }

  render() {
    const { selectedCity, visibleResults } = this.state;
    return <div>
      <h1>Cities of Utah</h1>
      <Typeahead>
        <TypeaheadInput onChange={(str)=> this.typeaheadInputChange(str)}/>
        <TypeaheadResultsList>
          {visibleResults.map((result, idx) => (
            <TypeaheadResult key={idx} onSelect={()=>{this.resultSelected(result)}}>{result.name}</TypeaheadResult>
          ))}
        </TypeaheadResultsList>
      </Typeahead>
      {
        selectedCity ? (
          <div className="city-selection">
            <h2>{selectedCity.name}</h2>
            <p>Of {selectedCity.county}</p>
            {selectedCity.yearSettled ? <p>Settled in {selectedCity.yearSettled}</p> : null}
            <p>Population: {selectedCity.population}</p>
          </div>
        ) : null
      }

      <Styles/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
