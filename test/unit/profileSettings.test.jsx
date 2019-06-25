// @flow
import React from 'react';
import sinon from 'sinon';
import ProfileSettings from '../../src/popUpModal/profileSettings/profileSettings';
import { defaultState, renderWithReduxAndTheme } from '../testUtils';
import { fireEvent } from '@testing-library/react';


describe('Profile Settings', () => {
  test('It has an avatar', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <ProfileSettings
        currentSubscriber={defaultState.subscriber.currentSubscriber}
        isSmall={false}
        togglePopUpModal={() => {}}
        updateSubscriber={() => {}}
        uploadAvatar={() => {}}
        promptRemoveAvatar={() => {}}
        promptDeleteAccount={() => {}}
      />
    );
    expect(getByTestId('profileSettings-avatar')).toBeTruthy();
  });

  test('It updates your subscriber', () => {
    const updateSubscriber = sinon.spy();
    const uploadAvatar = sinon.spy();
    const { getByTestId } = renderWithReduxAndTheme(
      <ProfileSettings
        currentSubscriber={defaultState.subscriber.currentSubscriber}
        isSmall={false}
        togglePopUpModal={() => {}}
        updateSubscriber={updateSubscriber}
        uploadAvatar={uploadAvatar}
        promptRemoveAvatar={() => {}}
        promptDeleteAccount={() => {}}
      />
    );

    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png',
    });

    fireEvent.change(getByTestId('avatar-upload'), { target: { files: [file] }});
    fireEvent.change(getByTestId('nickname'), { target: { value: 'UpdatedNickname' } });
    fireEvent.change(getByTestId('firstName'), { target: { value: 'Updated FN' } });
    fireEvent.change(getByTestId('lastName'), { target: { value: 'Updated LN' } });
    fireEvent.change(getByTestId('email'), { target: { value: 'updated@email.com' } });
    fireEvent.change(getByTestId('phoneNumber'), { target: { value: '123-456-7890' } });
    fireEvent.click(getByTestId('profile.save'));

    expect(uploadAvatar.calledOnce).toBeTrue();
    expect(updateSubscriber.calledOnce).toBeTrue();
    expect(updateSubscriber.calledWith(defaultState.subscriber.currentSubscriber.id, {
      nickname: 'UpdatedNickname',
      firstName: 'Updated FN',
      lastName: 'Updated LN',
      email: 'updated@email.com',
      phoneNumber: '123-456-7890',
    })).toBeTrue();
  });

  test('You can remove your avatar', () => {
    const removeAvatar = sinon.spy();
    const { getByTestId } = renderWithReduxAndTheme(
      <ProfileSettings
        currentSubscriber={defaultState.subscriber.currentSubscriber}
        isSmall={false}
        togglePopUpModal={() => {}}
        updateSubscriber={() => {}}
        uploadAvatar={() => {}}
        promptRemoveAvatar={removeAvatar}
        promptDeleteAccount={() => {}}
      />
    );

    fireEvent.click(getByTestId('removeAvatar'));
    expect(removeAvatar.calledOnce).toBeTrue();
  });

  test('You can delete your account', () => {
    const deleteAccount = sinon.spy();
    const { getByTestId } = renderWithReduxAndTheme(
      <ProfileSettings
        currentSubscriber={defaultState.subscriber.currentSubscriber}
        isSmall={false}
        togglePopUpModal={() => {}}
        updateSubscriber={() => {}}
        uploadAvatar={() => {}}
        promptRemoveAvatar={() => {}}
        promptDeleteAccount={deleteAccount}
      />
    );

    fireEvent.click(getByTestId('profile.delete_account'));
    expect(deleteAccount.calledOnce).toBeTrue();
  });
});
