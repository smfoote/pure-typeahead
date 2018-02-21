import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import TypeaheadResult from '../src/TypeaheadResult';

Enzyme.configure({ adapter: new Adapter() });

const RESULT_VALUE = 'RESULT_VALUE';
const shallowSetup = () => {
  const props = {
    _onSelect: jest.fn(),
    onHighlight: jest.fn(),
    isHighlighted: false,
    value: RESULT_VALUE
  };
  return {
    wrapper: shallow(<TypeaheadResult {...props}>Las Vegas</TypeaheadResult>),
    props
  };
};

describe('TypeaheadResult', () => {
  it('renders self and subcomponents', () => {
    const { wrapper } = shallowSetup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders self and subcomponents, isHighlighted is true', () => {
    const { props } = shallowSetup();
    props.isHighlighted = true;
    const wrapper = shallow(<TypeaheadResult {...props}>Las Vegas</TypeaheadResult>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call _onSelect when clicked', () => {
    const { props, wrapper } = shallowSetup();
    wrapper.find('typeahead-result').simulate('click');
    expect(props._onSelect).toHaveBeenCalled();
    expect(props._onSelect).toHaveBeenCalledWith(props.value);
  });

  it('should call onHighlight when result becomes highlighted', () => {
    const { props, wrapper } = shallowSetup();
    wrapper.setProps({isHighlighted: true});
    expect(props.onHighlight).toHaveBeenCalled();
  });
});
