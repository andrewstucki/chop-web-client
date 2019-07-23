// @flow
import React from 'react';
import { fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import Modal from '../../src/popUpModal';
import ChatSetNicknameModal from '../../src/popUpModal/chatSetNickname/chatSetNickname';
import { renderWithReduxAndTheme, defaultState } from '../testUtils';

describe('Guest nickname modal tests', () => {
  test('Set guest nickname modal renders', () => {
    const state = {
      feed: {
        ...defaultState,
        isPopUpModalVisible: true,
        popUpModal: {
          type: 'CHAT_SET_NICKNAME',
        },
      },
    };
    const { getByTestId } = renderWithReduxAndTheme(
      <Modal />,
      state
    );

    expect(getByTestId('chatSetNickname-modal')).toBeTruthy();
  });

  test('Guest nickname modal sends message', () => {
    const updateAndPost = sinon.spy();

    const { getByTestId } = renderWithReduxAndTheme(
      <ChatSetNicknameModal
        isSmall={false}
        togglePopUpModal={() => {}}
        updateAndPost={updateAndPost}
        openLogin={() => {}}
        id='123456'
      />
    );

    expect(getByTestId('chatSetNickname-modal')).toBeTruthy();

    fireEvent.click(getByTestId('chatSetNickname-post'));
    expect(updateAndPost.calledOnce).toEqual(false);

    const nicknameInput = getByTestId('chatSetNickname-nicknameField');
    fireEvent.change(nicknameInput, { target: { value: 'guest' } });
    expect(nicknameInput.value).toBe('guest');

    fireEvent.click(getByTestId('chatSetNickname-post'));
    expect(updateAndPost.calledOnce).toEqual(true);
  });
});
