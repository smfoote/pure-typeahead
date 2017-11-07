import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Typeahead from '../src/Typeahead';
import TypeaheadInput from '../src/TypeaheadInput';
import TypeaheadResultsList from '../src/TypeaheadResultsList';

Enzyme.configure({ adapter: new Adapter() });

const shallowSetup = () => {
  const props = {};
  return {
    wrapper: shallow(<Typeahead {...props}/>),
    props
  };
};

const mountSetup = () => {
  return {
    wrapper: mount(<Typeahead>
      hi
      <TypeaheadInput value="hello" onChange={jest.fn()}/>
      <TypeaheadResultsList>RESULTS</TypeaheadResultsList>
      {null}
    </Typeahead>)
  };
};

describe('Typeahead', () => {
  it('renders self and subcomponents', () => {
    const { wrapper } = shallowSetup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders the children', () => {
    const { wrapper } = mountSetup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('calls resultsList.navigateList when an arrow key is pressed', () => {
    const { wrapper } = mountSetup();
    wrapper.instance().resultsList.navigateList = jest.fn();
    wrapper.find('TypeaheadInput').props().arrowKeyPressed('ArrowDown');
    expect(wrapper.instance().resultsList.navigateList).toHaveBeenCalled();
  });

  it('should set the highlightedIndex state on updateHighlightedIndex', () => {
    const { wrapper } = mountSetup();
    wrapper.find('TypeaheadResultsList').props().updateHighlightedIndex(1);
    expect(wrapper.state().highlightedIndex).toBe(1);
  });

  it('should select the highlightedIndex by calling resultsList.selectResult with the state\'s highlightedIndex', () => {
    const { wrapper } = mountSetup();
    wrapper.instance().resultsList.selectResult = jest.fn();
    wrapper.setState({highlightedIndex: 3});
    wrapper.find('TypeaheadInput').props().enterKeyPressed();
    expect(wrapper.instance().resultsList.selectResult).toHaveBeenCalled();
    expect(wrapper.instance().resultsList.selectResult).toHaveBeenCalledWith(wrapper.state().highlightedIndex);
  });
});
