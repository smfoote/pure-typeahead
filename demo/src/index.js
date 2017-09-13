import React, {Component} from 'react'
import {render} from 'react-dom'

import { cities } from './cities';
import { nevadaCities } from './nevadaCities';
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
      visibleResults: [],
      nevadaResults: {},
      nevadaVisibleResults: [],
      currentSearch: ''
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
      visibleResults,
      currentSearch: str
    });
  }

  nevadaTypeaheadInputChange(str) {
    const { nevadaResults } = this.state;
    this.setState({ loadingNevadaResults: true });
    setTimeout(() => {
      let nevadaVisibleResults = [];
      if (str) {
        if (nevadaResults.hasOwnProperty(str)) {
          nevadaVisibleResults = nevadaResults[str];
        } else {
          nevadaVisibleResults = nevadaCities.filter(
            city => city.name.match(new RegExp(str, 'i'))
          );
          this.setState({
            nevadaResults: {
              ...nevadaResults,
              [str]: nevadaVisibleResults
            }
          })
        }
      }
      this.setState({
        nevadaVisibleResults,
        loadingNevadaResults: false
      });
    }, 1000);
  }

  resultSelected(result) {
    this.setState({
      selectedCity: result,
      visibleResults: []
    })
  }

  focusNevadaTypeahead() {
    this.nevadaInput.focus();
  }

  groupCitiesByCounties(cities) {
    return cities.reduce((acc, city) => {
      if (acc[city.county]) {
        acc[city.county].push(city);
      } else {
        acc[city.county] = [city];
      }
      return acc;
    }, {});
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

  renderNevadaTypeahead() {
    const counties = this.groupCitiesByCounties(this.state.nevadaVisibleResults);
    return (
      <TypeaheadResult key="nvTA" onHighlight={() => this.focusNevadaTypeahead()}>
        <Typeahead>
          <TypeaheadInput
            placeholder="Try a Nevada city instead?"
            onChange={(str) => this.nevadaTypeaheadInputChange(str)}
            ref={ref => this.nevadaInput = ref}
          />
          <TypeaheadResultsList>
            {
              this.state.loadingNevadaResults ?
              [
                <h3>Loading...</h3>,
                <img src="https://media.giphy.com/media/9UqRcQHzBou6A/giphy.gif"/>
              ] :
              this.renderGroupedCountyResults(counties)
            }
          </TypeaheadResultsList>
        </Typeahead>
      </TypeaheadResult>
    )
  }

  render() {
    const { selectedCity, visibleResults } = this.state;
    const counties = this.groupCitiesByCounties(visibleResults);
    return <div>
      <h1>Cities of Utah</h1>
      <Typeahead>
        <TypeaheadInput onChange={(str) => this.typeaheadInputChange(str)}/>
        <TypeaheadResultsList>
          {[
            this.renderGroupedCountyResults(counties),
            (this.state.currentSearch.length && !selectedCity && visibleResults.length< 2 ?
            this.renderNevadaTypeahead() : null)
          ]}
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
