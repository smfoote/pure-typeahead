import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import TypeaheadInput from '../src/TypeaheadInput';
import { evtMock } from '../testUtils';

Enzyme.configure({ adapter: new Adapter() });

const shallowSetup = () => {
  const props = {
    value: 'hi',
    onChange: jest.fn(),
    arrowKeyPressed: jest.fn(),
    enterKeyPressed: jest.fn()
  };
  return {
    wrapper: shallow(<TypeaheadInput {...props}/>),
    props
  };
};

describe('Typeahead', () => {
  it('renders self and subcomponents', () => {
    const { wrapper } = shallowSetup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('calls onChange when a change event happesn', () => {
    const { props, wrapper } = shallowSetup();
    wrapper.find('input').simulate('change', {target: {value: 'hello'}});
    expect(props.onChange).toHaveBeenCalled();
  });

  it('updates value when value prop changes', () => {
    const { props, wrapper } = shallowSetup();
    expect(wrapper.find('input').props().value).toBe('hi');
    wrapper.setProps({value: 'hello'});
    expect(wrapper.find('input').props().value).toBe('hello');
  });

  it('calls arrowKeyPressed when ArrowDown key is pressed', () => {
    const { props, wrapper } = shallowSetup();
    wrapper.find('input').simulate('keydown', {...evtMock, key: 'ArrowDown'});
    expect(props.arrowKeyPressed).toHaveBeenCalled();
  });

  it('calls arrowKeyPressed when ArrowUp key is pressed', () => {
    const { props, wrapper } = shallowSetup();
    wrapper.find('input').simulate('keydown', {...evtMock, key: 'ArrowUp'});
    expect(props.arrowKeyPressed).toHaveBeenCalled();
  });

  it('calls enterKeyPressed when Enter key is pressed', () => {
    const { props, wrapper } = shallowSetup();
    wrapper.find('input').simulate('keydown', {...evtMock, key: 'Enter'});
    expect(props.enterKeyPressed).toHaveBeenCalled();
  });

  it('does not call enterKeyPressed or arrowKeyPressed when a letter is pressed', () => {
    const { props, wrapper } = shallowSetup();
    wrapper.find('input').simulate('keydown', {...evtMock, key: 'a'});
    expect(props.enterKeyPressed).toHaveBeenCalledTimes(0);
    expect(props.arrowKeyPressed).toHaveBeenCalledTimes(0);
  });
});
