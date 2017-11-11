import React, {Component} from 'react'
import {render} from 'react-dom'

import { cities } from './cities';
import Typeahead from '../../src/Typeahead';
import TypeaheadInput from '../../src/TypeaheadInput';
import TypeaheadResultsList from '../../src/TypeaheadResultsList';
import TypeaheadResult from '../../src/TypeaheadResult';

import Styles from './styles';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      visibleResults: []
    }
  }
  typeaheadInputChange({ target: { value: str}}) {
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
      visibleResults,
      taValue: str
    });
  }

  resultSelected(result) {
    this.setState({
      selectedCity: result,
      visibleResults: [],
      taValue: ''
    })
  }

  renderGroupedCountyResults(counties) {
    return Object.keys(counties).reduce((arr, county) => {
      return [
        ...arr,
        (<h3 key={county}>{county}</h3>),
        ...(counties[county].map(city => (
          <TypeaheadResult onSelect={() => this.resultSelected(city)}>{city.name}</TypeaheadResult>
        )))
      ]
    }, []);
  }

  render() {
    const { selectedCity, visibleResults } = this.state;
    const counties = visibleResults.reduce((acc, city) => {
      if (acc[city.county]) {
        acc[city.county].push(city);
      } else {
        acc[city.county] = [city];
      }
      return acc;
    }, {});
    return <div>
      <h1>Cities of Utah</h1>
      <Typeahead>
        <TypeaheadInput
          value={this.state.taValue}
          ref={ref => this.inputEl = ref}
          onChange={(str)=> this.typeaheadInputChange(str)}
        />
        <TypeaheadResultsList>
          {this.renderGroupedCountyResults(counties)}
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
