import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Typeahead from '../src/Typeahead';
import TypeaheadInput from '../src/TypeaheadInput';
import TypeaheadResultsList from '../src/TypeaheadResultsList';

Enzyme.configure({ adapter: new Adapter() });

const shallowSetup = () => {
  const props = {
    onDismiss: jest.fn()
  };
  return {
    wrapper: shallow(<Typeahead {...props}/>),
    props
  };
};

const mountSetup = () => {
  const props = {
    onDismiss: jest.fn()
  };
  return {
    wrapper: mount(<Typeahead {...props}>
      hi
      <TypeaheadInput value="hello" onChange={jest.fn()}/>
      <TypeaheadResultsList>RESULTS</TypeaheadResultsList>
      {null}
    </Typeahead>),
    props
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

  it('should call props.onDismiss when escapeKeyPressed is called', () => {
    const { wrapper, props } = mountSetup();
    wrapper.find('TypeaheadInput').props().escapeKeyPressed();
    expect(props.onDismiss).toHaveBeenCalled();
  });

  it('should set the highlightedIndex state on updateHighlightedIndex', () => {
    const { wrapper } = mountSetup();
    wrapper.find('TypeaheadResultsList').props().updateHighlightedIndex(1);
    expect(wrapper.state().highlightedIndex).toBe(1);
  });

  it('should select the highlightedIndex by calling resultsList.selectResult with the state\'s highlightedIndex', () => {
    const { wrapper } = mountSetup();
    const highlightedIndex = 3;
    const evt = { preventDefault: jest.fn() };
    wrapper.instance().resultsList.selectResult = jest.fn();
    wrapper.setState({highlightedIndex});
    wrapper.find('TypeaheadInput').props().enterKeyPressed(evt);
    expect(wrapper.instance().resultsList.selectResult).toHaveBeenCalled();
    expect(wrapper.instance().resultsList.selectResult).toHaveBeenCalledWith(highlightedIndex);
    expect(evt.preventDefault).toHaveBeenCalledTimes(1);
    expect(wrapper.state('highlightedIndex')).toBe(-1);
  });

  it('should not select a result or preventDefault if highlightedindex is -1 state\'s highlightedIndex', () => {
    const { wrapper } = mountSetup();
    const highlightedIndex = -1;
    const evt = { preventDefault: jest.fn() };
    wrapper.instance().resultsList.selectResult = jest.fn();
    wrapper.setState({highlightedIndex});
    wrapper.find('TypeaheadInput').props().enterKeyPressed(evt);
    expect(wrapper.instance().resultsList.selectResult).toHaveBeenCalledTimes(0);
    expect(evt.preventDefault).toHaveBeenCalledTimes(0);
    expect(wrapper.state('highlightedIndex')).toBe(-1);
  });
});
