import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import TypeaheadResult from '../src/TypeaheadResult';

Enzyme.configure({ adapter: new Adapter() });

const shallowSetup = () => {
  const props = {
    onSelect: jest.fn(),
    isHighlighted: false,
  };
  return {
    wrapper: shallow(<TypeaheadResult {...props}>Las Vegas</TypeaheadResult>),
    props
  };
};

describe('Typeahead', () => {
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

  it('should call onSelect when clicked', () => {
    const { props, wrapper } = shallowSetup();
    wrapper.find('typeahead-result').simulate('click');
    expect(props.onSelect).toHaveBeenCalled();
  });
});
