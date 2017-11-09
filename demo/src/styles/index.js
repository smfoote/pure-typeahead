import React, {Component} from 'react'

export default class extends Component {
  render() {
    return <style>{`
      body {
        font-family: Helvetica, sans-serif;
      }
      pure-typeahead {
        display: block;
        width: 450px;
        margin: 0 auto;
      }
      pure-typeahead input {
        width: 100%;
        padding: 4px;
        font-size: 20px;
        box-sizing: border-box;
      }
      typeahead-results-list {
        display: block;
        position: absolute;
        width: 450px;
        background-color: #FFF;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      }
      typeahead-results-list h3 {
        padding: 8px;
        margin: 0;
        border-bottom: 1px solid #BBB;
        font-size: 16px;
        font-weight: 600;
        background-color: #EEE;
      }
      typeahead-result {
        display: block;
        padding: 8px;
        cursor: pointer;
      }
      typeahead-result:not(:last-child) {
        border-bottom: 1px solid #BBB;
      }
      typeahead-result:hover,
      typeahead-result.typeahead-highlighted {
        background-color: #DDD;
      }

      .city-selection {
        width: 400px;
        margin: 0 auto;
        text-align: center;
      }
    `}</style>
  }
}
