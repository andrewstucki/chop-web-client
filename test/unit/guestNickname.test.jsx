// @flow
import React from 'react';
import { fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import Modal from '../../src/popUpModal';
import GuestNicknameModal from '../../src/popUpModal/guestNickname/guestNickname';
import { renderWithReduxAndTheme, defaultState } from '../testUtils';

describe('Guest nickname modal tests', () => {
  test('Set guest nickname modal renders', () => {
    const state = {
      feed: {
        ...defaultState,
        isPopUpModalVisible: true,
        popUpModal: {
          type: 'GUEST_NICKNAME',
        },
      },
    };
    const { getByTestId } = renderWithReduxAndTheme(
      <Modal />,
      state
    );

    expect(getByTestId('guestNickname-modal')).toBeTruthy();
  });

  test('Guest nickname modal sends message', () => {
    const updateAndPost = sinon.spy();

    const { getByTestId } = renderWithReduxAndTheme(
      <GuestNicknameModal
        isSmall={false}
        togglePopUpModal={() => {}}
        updateAndPost={updateAndPost}
        openLogin={() => {}}
        id='123456'
      />
    );

    expect(getByTestId('guestNickname-modal')).toBeTruthy();

    fireEvent.click(getByTestId('guestNickname-post'));
    expect(updateAndPost.calledOnce).toEqual(false);

    const nicknameInput = getByTestId('guestNickname-nicknameField');
    fireEvent.change(nicknameInput, { target: { value: 'guest' } });
    expect(nicknameInput.value).toBe('guest');

    fireEvent.click(getByTestId('guestNickname-post'));
    expect(updateAndPost.calledOnce).toEqual(true);
  });
});
