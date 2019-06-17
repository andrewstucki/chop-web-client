// @flow
import React from 'react';
import sinon from 'sinon';
import { renderWithReduxAndTheme, defaultState } from '../testUtils';
import { fireEvent } from '@testing-library/react';

import PopUpModal from '../../src/popUpModal';
import Login from '../../src/popUpModal/login/login';

describe('Login tests', () => {
  test('Component renders', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <PopUpModal />,
      {
        feed: {
          ...defaultState,
          isPopUpModalVisible: true,
          popUpModal: {
            type: 'LOGIN',
          },
        },
      }
    );
    expect(getByTestId('login-modal')).toBeTruthy();
  });

  test('Changing values updates state', () => {
    const basicAuthLogin = sinon.spy();

    const { getByTestId } = renderWithReduxAndTheme(
      <Login 
        togglePopUpModal={() => {}}
        basicAuthLogin={basicAuthLogin}
        error={false}
        isSmall={false}
        removeLoginError={() => {}}
        resetPassword={() => {}}
      />,
      {
        feed: {
          ...defaultState,
          isPopUpModalVisible: true,
          popUpModal: {
            type: 'LOGIN',
          },
        },
      }
    );

    const emailInput = getByTestId('login-emailField');
    fireEvent.change(emailInput, { target: { value: 'test@life.church' } });
    expect(emailInput.value).toBe('test@life.church');

    const passwordInput = getByTestId('login-passwordField');
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    expect(passwordInput.value).toBe('password');

    const loginButton = getByTestId('login-loginButton');
    fireEvent.click(loginButton);
    expect(basicAuthLogin.calledOnce).toEqual(true);
  });
});
