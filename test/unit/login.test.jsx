// @flow
import React from 'react';
import sinon from 'sinon';
import { renderWithReduxAndTheme } from '../testUtils';
import { fireEvent } from 'react-testing-library';

import Login from '../../src/login/login';

describe('Login tests', () => {
  test('Component renders', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Login basicAuthLogin={() => {}} isAuthenticated={false} clearErrors={() => {}}/>
    );
    expect(getByTestId('login')).toBeTruthy();
  });

  test('Changing values updates state', () => {
    const basicAuthLogin = sinon.spy();

    const { getByTestId } = renderWithReduxAndTheme(
      <Login basicAuthLogin={basicAuthLogin} isAuthenticated={false} clearErrors={() => {}}/>
    );

    const emailInput = getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'test@life.church' } });
    expect(emailInput.value).toBe('test@life.church');

    const passwordInput = getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    expect(passwordInput.value).toBe('password');

    const loginButton = getByTestId('login.submit');
    fireEvent.click(loginButton);
    expect(basicAuthLogin.calledOnce).toEqual(true);
  });
});
