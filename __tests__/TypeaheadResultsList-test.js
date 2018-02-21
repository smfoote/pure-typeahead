import React from 'react';
import Enzyme, { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import TypeaheadResultsList from '../src/TypeaheadResultsList';
import TypeaheadResult from '../src/TypeaheadResult';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    updateHighlightedIndex: jest.fn(),
    onResultsUpdate: jest.fn(),
    highlightedIndex: -1,
  };
  return {
    wrapper: mount(<TypeaheadResultsList {...props}>
      <h3>Cities</h3>
      <TypeaheadResult>Las Vegas</TypeaheadResult>
      <TypeaheadResult>Los Angeles</TypeaheadResult>
      <TypeaheadResult>San Francisco</TypeaheadResult>
    </TypeaheadResultsList>),
    props
  };
};

describe('TypeaheadResultsList', () => {
  it('renders self and subcomponents', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
