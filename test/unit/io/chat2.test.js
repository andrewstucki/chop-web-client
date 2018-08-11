// @flow
import Pubnub from 'pubnub';
import Chat from '../../../src/io/chat/chat2';
import { defaultState } from '../../../src/feed/dux';

describe('Chat2 Tests', () => {
  test('Connect to pubnub channels', () => {
    jest.mock('pubnub');
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(
      {
        ...defaultState,
        currentUser: {
          ...defaultState.currentUser,
          pubnubToken: '123456',
          pubnubAccessKey: '1533912921585',
        },
        pubnubKeys: {
          publish: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
          subscribe: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
        },
      }
    );

    const chat = new Chat(dispatch, getState); // eslint-disable-line no-unused-vars 

    expect(Pubnub).toHaveBeenCalledTimes(1);
    expect(Pubnub).toHaveBeenCalledWith(
      {
        publishKey: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
        subscribeKey: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
        authKey: '1533912921585',
        uuid: '123456',
      }
    );
  });
});