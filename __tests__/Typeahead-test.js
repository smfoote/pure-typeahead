import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Typeahead from '../src/Typeahead';
import TypeaheadInput from '../src/TypeaheadInput';
import TypeaheadResultsList from '../src/TypeaheadResultsList';
import TypeaheadResult from '../src/TypeaheadResult';

Enzyme.configure({ adapter: new Adapter() });

const RESULT_VALUE = { some: 'value' };
const shallowSetup = () => {
  const props = {
    onDismiss: jest.fn(),
    onSelect: jest.fn()
  };
  return {
    wrapper: shallow(<Typeahead {...props}/>),
    props
  };
};

const mountSetup = () => {
  const props = {
    onDismiss: jest.fn(),
    onSelect: jest.fn()
  };
  return {
    wrapper: mount(<Typeahead {...props}>
      hi
      <TypeaheadInput value="hello" onChange={jest.fn()}/>
      <TypeaheadResultsList>
        <TypeaheadResult value={RESULT_VALUE}>RESULTS</TypeaheadResult>
        <TypeaheadResult value={'hello'}>hello</TypeaheadResult>
        <TypeaheadResult value={'world'}>world</TypeaheadResult>
      </TypeaheadResultsList>
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

  it('updates the highlighted index when an arrow key is pressed', () => {
    const { wrapper } = mountSetup();
    wrapper.setState({highlightedIndex: -1});
    wrapper.find('TypeaheadInput').props().arrowKeyPressed('ArrowDown');
    expect(wrapper.state().highlightedIndex).toBe(0);
  });

  it('should navigate the list, go around the horn', () => {
    const { wrapper } = mountSetup();
    wrapper.find('TypeaheadInput').props().arrowKeyPressed('ArrowDown');
    expect(wrapper.state().highlightedIndex).toBe(0);
    wrapper.find('TypeaheadInput').props().arrowKeyPressed('ArrowDown');
    expect(wrapper.state().highlightedIndex).toBe(1);
    wrapper.find('TypeaheadInput').props().arrowKeyPressed('ArrowDown');
    expect(wrapper.state().highlightedIndex).toBe(2);
    wrapper.find('TypeaheadInput').props().arrowKeyPressed('ArrowDown');
    expect(wrapper.state().highlightedIndex).toBe(0);
    wrapper.find('TypeaheadInput').props().arrowKeyPressed('ArrowUp');
    expect(wrapper.state().highlightedIndex).toBe(2);
    wrapper.find('TypeaheadInput').props().arrowKeyPressed('ArrowUp');
    expect(wrapper.state().highlightedIndex).toBe(1);
    wrapper.find('TypeaheadInput').props().arrowKeyPressed('ArrowUp');
    expect(wrapper.state().highlightedIndex).toBe(0);
    wrapper.find('TypeaheadInput').props().arrowKeyPressed('ArrowUp');
    expect(wrapper.state().highlightedIndex).toBe(2);
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

  it('should select the highlighted result', () => {
    const { wrapper, props } = mountSetup();
    const highlightedIndex = 0;
    const evt = { preventDefault: jest.fn() };
    wrapper.setState({highlightedIndex});
    wrapper.find('TypeaheadInput').props().enterKeyPressed(evt);
    expect(props.onSelect).toHaveBeenCalledWith(RESULT_VALUE);
    expect(evt.preventDefault).toHaveBeenCalledTimes(1);
    expect(wrapper.state('highlightedIndex')).toBe(-1);
  });

  it('should not select a result or preventDefault if highlightedindex is -1 state\'s highlightedIndex', () => {
    const { wrapper } = mountSetup();
    const highlightedIndex = -1;
    const evt = { preventDefault: jest.fn() };
    wrapper.select = jest.fn();
    wrapper.setState({highlightedIndex});
    wrapper.find('TypeaheadInput').props().enterKeyPressed(evt);
    expect(wrapper.select).toHaveBeenCalledTimes(0);
    expect(evt.preventDefault).toHaveBeenCalledTimes(0);
    expect(wrapper.state('highlightedIndex')).toBe(-1);
  });
});
