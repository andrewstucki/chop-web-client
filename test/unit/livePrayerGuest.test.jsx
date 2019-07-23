// @flow
import React from 'react';
import sinon from 'sinon';
import { fireEvent } from '@testing-library/react';
import { defaultState } from '../../src/chop/dux';
import { renderWithReduxAndTheme } from '../testUtils';
import LivePrayerButton from '../../src/components/livePrayerButton';
import LivePrayerButtonConnected from '../../src/components/livePrayerButton/livePrayerButton';
import LivePrayerSetNicknameModal from '../../src/popUpModal/livePrayerSetNickname';
import LivePrayerSetNicknameModalConnected from '../../src/popUpModal/livePrayerSetNickname/livePrayerSetNickname';

describe('live prayer test', () => {
  test('Live prayer button displays nickname modal when subscriber is without a nickname', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <LivePrayerButton />,
      {
        ...defaultState,
        subscriber: {
          ...defaultState.subscriber,
          currentSubscriber: {
            id: '123abc',
            nickname: '',
            avatar: null,
            role: {
              label: '',
            },
          },
        },
      }
    );

    expect(queryByTestId('livePrayer-button')).toBeTruthy;
    fireEvent.click(queryByTestId('livePrayer-button'));
    expect(queryByTestId('livePrayerSetNickname-modal')).toBeTruthy;
  });

  test('Live prayer button requests live prayer when subscriber has a nickname', () => {
    const currentSubscriber = {
      id: '123abc',
      nickname: 'guest',
      avatar: null,
      role: {
        label: '',
      },
    };
    const requestLivePrayer = sinon.spy();
    const { queryByTestId } = renderWithReduxAndTheme(
      <LivePrayerButtonConnected 
        requestLivePrayer={requestLivePrayer}
        setNickname={() => {}}
        currentSubscriber={currentSubscriber}
      />
    );

    expect(queryByTestId('livePrayer-button')).toBeTruthy;
    fireEvent.click(queryByTestId('livePrayer-button'));
    expect(requestLivePrayer.calledOnce).toBeTruthy();
  });

  test('Live prayer modal displays the login modal', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <LivePrayerSetNicknameModal />,
      {
        ...defaultState,
        subscriber: {
          ...defaultState.subscriber,
          currentSubscriber: {
            id: '123abc',
            nickname: '',
            avatar: null,
            role: {
              label: '',
            },
          },
        },
      }
    );
    expect(queryByTestId('livePrayerSetNickname-modal')).toBeTruthy;
    fireEvent.click(queryByTestId('livePrayerSetNickname-login'));
    expect(queryByTestId('login-modal')).toBeTruthy;
  });

  test('Live prayer modal displays error when nickname is blank', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <LivePrayerSetNicknameModal />,
      {
        ...defaultState,
        subscriber: {
          ...defaultState.subscriber,
          currentSubscriber: {
            id: '123abc',
            nickname: '',
            avatar: null,
            role: {
              label: '',
            },
          },
        },
      }
    );
    expect(queryByTestId('livePrayerSetNickname-modal')).toBeTruthy;
    fireEvent.click(queryByTestId('livePrayerSetNickname-post'));
    expect(queryByTestId('livePrayerSetNickname-blankError')).toBeTruthy;
  });

  test('Live prayer modal updates subscriber when nickname is given and calls live prayer', () => {
    const updateAndRequestPrayer = sinon.spy();
    const { queryByTestId } = renderWithReduxAndTheme(
      <LivePrayerSetNicknameModalConnected 
        togglePopUpModal={() => {}}
        updateAndRequestPrayer={updateAndRequestPrayer}
        login={() => {}}
        id='123abc'
        isSmall={false}
      />
    );

    const nicknameInput = queryByTestId('livePrayerSetNickname-nicknameField');
    fireEvent.change(nicknameInput, { target: { value: 'guest' } });
    expect(nicknameInput.value).toBe('guest');

    fireEvent.click(queryByTestId('livePrayerSetNickname-post'));
    expect(updateAndRequestPrayer.calledOnce).toBeTruthy();
  });
});