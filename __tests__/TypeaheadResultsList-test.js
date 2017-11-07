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

describe('Typeahead', () => {
  it('renders self and subcomponents', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should navigate the list, go around the horn', () => {
    const { wrapper } = setup();
    wrapper.setProps({
      updateHighlightedIndex: jest.fn().mockImplementation(idx => {
        wrapper.setProps({highlightedIndex: idx});
      })
    });
    const updateHighlightedIndex = wrapper.props().updateHighlightedIndex;
    wrapper.instance().navigateList('ArrowDown');
    expect(updateHighlightedIndex).toHaveBeenLastCalledWith(0);
    wrapper.instance().navigateList('ArrowDown');
    expect(updateHighlightedIndex).toHaveBeenLastCalledWith(1);
    wrapper.instance().navigateList('ArrowDown');
    expect(updateHighlightedIndex).toHaveBeenLastCalledWith(2);
    wrapper.instance().navigateList('ArrowDown');
    expect(updateHighlightedIndex).toHaveBeenLastCalledWith(0);
    wrapper.instance().navigateList('ArrowUp');
    expect(updateHighlightedIndex).toHaveBeenLastCalledWith(2);
    wrapper.instance().navigateList('ArrowUp');
    expect(updateHighlightedIndex).toHaveBeenLastCalledWith(1);
    wrapper.instance().navigateList('ArrowUp');
    expect(updateHighlightedIndex).toHaveBeenLastCalledWith(0);
    wrapper.instance().navigateList('ArrowUp');
    expect(updateHighlightedIndex).toHaveBeenLastCalledWith(2);
  });

  it('should call select on the correct result', () => {
    const { wrapper } = setup();

    wrapper.instance().result1.select = jest.fn();
    wrapper.instance().selectResult(1);
    expect(wrapper.instance().result1.select).toHaveBeenCalled();
  });
});
