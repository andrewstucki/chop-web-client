// @flow
import React from 'react';
import { fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import Modal from '../../src/popUpModal';
import ResetPasswordModal from '../../src/popUpModal/resetPassword/resetPassword';
import { renderWithReduxAndTheme, defaultState } from '../testUtils';

describe('Reset password modal tests', () => {
  test('Request password reset modal updates', () => {
    const state = {
      feed: {
        ...defaultState,
        isPopUpModalVisible: true,
        popUpModal: {
          type: 'REQUEST_PASSWORD_RESET',
        },
      },
    };
    const { getByTestId } = renderWithReduxAndTheme(
      <Modal />,
      state
    );

    expect(getByTestId('requestPasswordReset-modal')).toBeTruthy();
    expect(getByTestId('requestPasswordReset-description').textContent).toEqual(
      'request_password_reset.description'
    );

    const emailInput = getByTestId('requestPasswordReset-emailField');
    fireEvent.change(emailInput, { target: { value: 'joe@test.com' } });
    expect(emailInput.value).toBe('joe@test.com');

    fireEvent.click(getByTestId('requestPasswordReset-reset'));
    expect(getByTestId('requestPasswordReset-confirmation')).toBeTruthy();
  });

  test('Reset password modal sends request', () => {
    const resetPassword = sinon.spy();

    const { getByTestId } = renderWithReduxAndTheme(
      <ResetPasswordModal 
        isSmall={false} 
        resetToken='abc123' 
        togglePopUpModal={() => {}} 
        resetPassword={resetPassword}
      />
    );

    expect(getByTestId('resetPassword-modal')).toBeTruthy();

    const passwordInput = getByTestId('resetPassword-passwordField');
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    expect(passwordInput.value).toBe('password');

    fireEvent.click(getByTestId('resetPassword-reset'));
    expect(resetPassword.calledOnce).toEqual(false);

    const passwordInput2 = getByTestId('resetPassword-passwordConfirmationField');
    fireEvent.change(passwordInput2, { target: { value: 'password' } });
    expect(passwordInput2.value).toBe('password');

    fireEvent.click(getByTestId('resetPassword-reset'));
    expect(resetPassword.calledOnce).toEqual(true);
  });
});