// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import sinon from 'sinon';
import { mountWithTheme } from '../testUtils';

import Login from '../../src/login/login';
import Button from '../../src/components/button';
import { Wrapper } from '../../src/login/styles';

Enzyme.configure({ adapter: new Adapter() });

describe('Login tests', () => {
  test('Component renders', () => {
    const wrapper = Enzyme.shallow(
      <Login basicAuthLogin={() => {}} isAuthenticated={false} clearErrors={() => {}}/>
    );
    expect(wrapper.find(Wrapper).exists()).toBeTruthy();
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

    const wrapper = mountWithTheme(
      <Provider store={store}>
        <div>
          <Login basicAuthLogin={basicAuthLogin} isAuthenticated={false} clearErrors={() => {}}/>
        </div>
      </Provider>
    );

    const emailInput = wrapper.find('input[name="email"]');
    emailInput.instance().value = 'test@life.church';
    emailInput.simulate('change');

    const passwordInput = wrapper.find('input[name="password"]');
    passwordInput.instance().value = 'password';
    passwordInput.simulate('change');

    expect(wrapper.find(Button).prop('disabled')).toBeFalsy();
    wrapper.find(Button).simulate('click');
    expect(basicAuthLogin.calledOnce).toEqual(true);
  });
});
