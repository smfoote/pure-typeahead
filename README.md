# Pure Typeahead

[![Build Status](https://travis-ci.org/smfoote/pure-typeahead.svg?branch=master)](https://travis-ci.org/smfoote/pure-typeahead)
[![npm package][npm-badge]][npm]

Originally built for a [talk at UtahJS Conf](https://www.youtube.com/watch?v=ANcWdK3rDMI). The Pure Typeahead is a composable typeahead component for React that allows you to build whatever kind of typeahead experience you need without configuration.

## Installation

`$ yarn add pure-typeahead`

or

`$ npm install --save pure-typeahead`

In your application JavaScript file:

`import { Typeahead, TypeaheadInput, TypeaheadResultsList, TypeaheadResult } from 'pure-typeahead';`

Due to vast styling difference between typeahead experiences, this typeahead does not provide any styles out of the box. Please see `demo/src/styles/index.js` for an example of how the typeahead can be styled.

### Dependencies

This package has no dependencies, but does have React 16 as a peer dependency. The component will not work with lower versions of React.

## API

This component consists of four React components: `Typeahead`, `TypeaheadInput`, `TypeaheadResultsList`, and `TypeaheadResult`.

### Typeahead component

The `Typeahead` component wraps the other, more functional component. It's purpose is to orchestrate the interactions of its children components. The `Typeahead` component needs a `TypeaheadInput` component and a `TypeaheadResultsList` component as direct children. It can have other children as well. For CSS targeting purposes, the `Typeahead` component produces a custom element tag, `<pure-typeahead>`, in the rendered DOM.

|Name|Required|Type|Default Value|Description|
|----|--------|----|-----------|
|onDismiss|optional|function|No-op function|This function is called when the typeahead is dismissed when the user presses the escape key|
|onBlur|optional|function|No-op function|This function is called when the entire typeahead component is blurred. If you want to listen to blurs on the input, this is the place to do it|

### TypeaheadInput component

The `TypeaheadInput` component is the input where the user will type their typeahead query. For accessibility to work properly, you need to use `TypeaheadInput` instead of a plain `<input>` element.

#### Props

|Name|Required|Type|Default Value|Description|
|----|--------|----|-----------|
|value|required|string|N/A|The value of the input. This input is a [controlled component](https://reactjs.org/docs/forms.html#controlled-components), so the value must be provided and updated through `onChange`.|
|type|optional|string|'text'|The type of input to be used. Don't use `'checkbox'` or `'radio'` and expect this thing to work.|
|placeholder|optional|string|none|The placeholder text to be placed in the input.|
|onChange|required|function|N/A|The function to be called when the value of the input changes. This is where you will likely query for new typeahead results. You also must update the `value` prop within this function.|
|onKeyDown|optional|function|No-op function|Passes through the input's onKeyDown function|
|onKeyUp|optional|function|No-op function|Passes through the input's onKeyUp function|
|onBlur|optional|function|No-op function|Passes through the input's onBlur function|
|onFocus|optional|function|No-op function|Passes through the input's onFocus function|

### TypeaheadResultsList component

The `TypeaheadResultsList` component wraps the `TypeaheadResult` components. It expects to have `TypeaheadResult` components as direct children, but can also have other components as children. For example, you can add `<h3>`s as headers between groups of results. You can also add an `<svg>` as a loading spinner, or a `<p>` describing that no results were found. Only `TypeaheadResult` components will be navigable with the arrow keys and selectable with the mouse. Other children will be skipped.

### TypeaheadResult component

This component, which must be a direct child of the `TypeaheadResultsList` component, is where you describe one of the results of the typeahead. You can add anything you want as a child of this component, including text, images, and buttons.

#### Props

|Name|Required|Type|Default Value|Description|
|----|--------|----|-----------|
|onSelect|required|function|N/A|This function will be called when the typeahead is selected, whether by click or by keyboard interaction.|
|onHighlight|optional|function|No-op function|This function will be called when the typeahead is highlighted through keyboard interaction|

## Examples

The typeahead doesn't do much on its own; it must be properly composed to work correctly. As such, some examples are in order.

### Basic typeahead, local data

```js
import React, { Component } from 'react';

import { cities } from './cities';
import Typeahead from '../../src/Typeahead';
import TypeaheadInput from '../../src/TypeaheadInput';
import TypeaheadResultsList from '../../src/TypeaheadResultsList';
import TypeaheadResult from '../../src/TypeaheadResult';

class Demo extends Component {
  state = {
    results: [],
    taValue: '',
    selectedResult: null
  }

  typeaheadInputChange(evt) {
    const { value: str } = evt.target;
    const results = cities.filter(
      city => city.name.match(new RegExp(str, 'i'))
    );
    this.setState({
      taValue: str,
      results
    });
  }

  resultSelected(result) {
    this.setState({
      selectedResult: result,
      results: [],
      taValue: ''
    });
  }

  render() {
    const { selectedResult } = this.state;

    return [
      <Typeahead key="typeahead">
        <TypeaheadInput
          value={this.state.taValue}
          onChange={(evt)=> this.typeaheadInputChange(evt)}
        />
        <TypeaheadResultsList>
          {this.state.results.map(result => (
            <TypeaheadResult
              onSelect={() => this.resultSelected(result)}
            >
              {result.name}
            </TypeaheadResult>
          ))}
        </TypeaheadResultsList>
      </Typeahead>,
      (selectedResult &&
        <div key="selected-result">
          <h2>{selectedResult.name}</h2>
          <h3>{selectedResult.county} County</h3>
          <h3>{selectedResult.population} pop.</h3>
        </div>
      )
    ];
  }

}

export default Demo;
```

### Typeahead with groups of results and headers

```js
import React, { Component } from 'react';

import { cities } from './cities';
import Typeahead from '../../src/Typeahead';
import TypeaheadInput from '../../src/TypeaheadInput';
import TypeaheadResultsList from '../../src/TypeaheadResultsList';
import TypeaheadResult from '../../src/TypeaheadResult';

class Demo extends Component {
  state = {
    results: [],
    taValue: '',
    selectedResult: null
  }

  typeaheadInputChange(evt) {
    const { value: str } = evt.target;
    const results = cities.filter(
      city => city.name.match(new RegExp(str, 'i'))
    );
    this.setState({
      taValue: str,
      results
    });
  }

  resultSelected(result) {
    this.setState({
      selectedResult: result,
      results: [],
      taValue: ''
    });
  }

  render() {
    const { results, selectedResult } = this.state;
    // Group cities by county
    const counties = results.reduce((acc, city) => {
      if (acc[city.county]) {
        acc[city.county].push(city);
      } else {
        acc[city.county] = [city];
      }
      return acc;
    }, {});

    return [
      <Typeahead key="typeahead">
        <TypeaheadInput
          value={this.state.taValue}
          onChange={(evt)=> this.typeaheadInputChange(evt)}
        />
        <TypeaheadResultsList>
          {Object.keys(counties).reduce((arr, county) => {
            return [
              ...arr,
              // Display county name at the top of each county group
              (<h3 key={county}>{county}</h3>),
              ...(counties[county].map(city => (
                <TypeaheadResult onSelect={() => this.resultSelected(city)}>{city.name}</TypeaheadResult>
              )))
            ]
          }, [])}
        </TypeaheadResultsList>
      </Typeahead>,
      (selectedResult &&
        <div key="selected-result">
          <h2>{selectedResult.name}</h2>
          <h3>{selectedResult.county} County</h3>
          <h3>{selectedResult.population} pop.</h3>
        </div>
      )
    ];
  }

}

export default Demo;
```
[npm-badge]: https://img.shields.io/npm/v/pure-typeahead.png?style=flat-square
[npm]: https://www.npmjs.org/package/pure-typeahead
