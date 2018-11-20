// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import sinon from 'sinon';

import Login from '../../src/login/login';

Enzyme.configure({ adapter: new Adapter() });

describe('Login tests', () => {
  test('Component renders', () => {
    const wrapper = Enzyme.shallow(
      <Login basicAuthLogin={() => {}} isAuthenticated={false}/>
    );
    expect(wrapper.find('.login').type()).toEqual('div');
  });

  test('Changing values updates state', () => {
    const basicAuthLogin = sinon.spy();

    const store = createStore(() => (
      {
        feed: {
          errors: [],
        },
      }
    ));

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <div>
          <Login basicAuthLogin={basicAuthLogin} isAuthenticated={false}/>
        </div>   
      </Provider>
    );

    expect(wrapper.find('#login').prop('disabled')).toBeTruthy();

    const emailInput = wrapper.find('input[name="email"]');
    emailInput.instance().value = 'test@life.church';
    emailInput.simulate('change');

    const passwordInput = wrapper.find('input[name="password"]');
    passwordInput.instance().value = 'password';
    passwordInput.simulate('change');
    
    expect(wrapper.find('#login').prop('disabled')).toBeFalsy();
    wrapper.find('#login').simulate('click');
    expect(basicAuthLogin.calledOnce).toEqual(true);
  });
});
