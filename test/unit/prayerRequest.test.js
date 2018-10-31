// @flow
import { __messageEvent } from 'pubnub';
import { defaultState } from '../../src/feed/dux';
import Chat from '../../src/io/chat';
jest.mock('pubnub');

describe('Prayer Request Tests', () => {
  const store = {
    ...defaultState,
    currentUser: {
      ...defaultState.currentUser,
      pubnubToken: '123456',
      pubnubAccessKey: '1533912921585',
    },
    event: {
      id: 320418,
      startTime: 1529425800000,
      title: 'When Pigs Fly - Week 2',
      timezone: 'Central',
    },
    organization: {
      id: 2,
      name: 'Life.Church',
    },
    pubnubKeys: {
      publish: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
      subscribe: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
    },
    channels: {
      ...defaultState.channels,
      '123456': {
        name: 'public',
        id: '123456',
        moments: [],
      },
      '789012': {
        name: 'Host',
        id: '789012',
        moments: [],
      },
    },
  };

  test('Receive prayer request from legacy', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState);

    chat.dispatch(
      {
        type: 'SET_PUBNUB_KEYS',
      }
    );
    
    __messageEvent(
      {
        channel: 'public',
        message: {
          action: 'newLiveResponseRequest',
          data: {
            fromToken: 'jarjartoken',
            fromNickname: 'JarJar',
            channel: 'public',
            type: 'prayer',
          },
        },
        publisher: '123456',
        subscription: null,
        timetoken: '14966804541029440',
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0]).toMatchObject(
      {
        type: 'RECEIVE_MOMENT',
        channel: '789012',
        moment: {
          type: 'ACTIONABLE_NOTIFICATION',
          notificationType: 'PRAYER_REQUEST',
          id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
          user: {
            name: 'JarJar',
            pubnubToken: 'jarjartoken',
          },
          active: true,
          timeStamp: expect.stringMatching(/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/),
        },
      }
    );
  });
});