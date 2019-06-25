// @flow
import Adapter from 'enzyme-adapter-react-16';
import InputField from '../../../src/components/inputField';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { mountWithTheme } from '../../testUtils';

Enzyme.configure({ adapter: new Adapter() });

describe('InputField', () => {
  test('It renders and responds to change.', () => {
    const onInputChange = sinon.spy();
    const wrapper = mountWithTheme(
      <InputField
        type='email'
        name='email'
        label='Email'
        onChange={onInputChange}/>
    );

    expect(wrapper.find('label').text()).toEqual('Email');
    expect(wrapper.find('input').prop('type')).toEqual('email');
    expect(wrapper.find('input').prop('name')).toEqual('email');
    wrapper.find('input').simulate('change');
    expect(onInputChange.calledOnce).toEqual(true);
  });

  test('Imperative handle returns the value', () => {
    const onInputChange = sinon.spy();
    const ref = React.createRef();
    mountWithTheme(
      <InputField
        ref={ref}
        type='email'
        name='email'
        label='Email'
        onChange={onInputChange}
        value='initialValue'
      />
    );
    expect.assertions(1);
    if (ref.current) {
      expect (ref.current.value()).toEqual('initialValue');
    }
  });
});
