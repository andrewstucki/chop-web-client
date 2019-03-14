// @flow
import { createStore, applyMiddleware } from 'redux';
import actorMiddleware from '../../src/middleware/actor-middleware';
import reducer from '../../src/chop/dux';
import { getAvailableForPrayer } from '../../src/selectors/hereNowSelector';
import { __messageEvent, __presenceEvent, mockHereNow } from 'pubnub';
import { addChannel, defaultState } from '../../src/feed/dux';
import Chat from '../../src/io/chat';
jest.mock('pubnub');

describe('Prayer Request Tests', () => {
  const _store = {
    ...defaultState,
    currentUser: {
      ...defaultState.currentUser,
      pubnubToken: '123456',
      pubnubAccessKey: '1533912921585',
    },
    event: {
      id: 320418,
      eventTimeId: 1920834,
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
        direct: false,
        moments: [],
        anchorMoments: [],
        scrollPosition: 0,
        sawLastMomentAt: 1546896104521,
      },
      '789012': {
        name: 'Host',
        id: '789012',
        direct: false,
        moments: [],
        anchorMoments: [],
        scrollPosition: 0,
        sawLastMomentAt: 1546896104521,
      },
    },
  };

  test('Receive prayer request from legacy', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    getState.mockReturnValue(_store);

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
          timestamp: expect.stringMatching(/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/),
        },
      }
    );
  });

  test('Receive accepted prayer request', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(_store);

    const chat = new Chat(dispatch, getState);

    chat.init();

    __messageEvent(
      {
        channel: 'Host',
        message: {
          action: 'removeLiveResponseRequest',
          channel: 'Host',
          data: {
            messageId: '123456',
            channel: '123456',
            fromToken: '789012',
            fromNickname: 'G. Boole',
            roomType: 'public',
          },
        },
      }
    );

    __messageEvent(
      {
        channel: 'Host',
        message: {
          action: 'removeLiveResponseRequest',
          channel: 'Host',
          data: {
            messageId: '123456',
            channel: '123456',
            fromToken: '789012',
            fromNickname: 'G. Boole',
            roomType: 'public',
            leave: true,
          },
        },
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0]).toEqual(
      {
        type: 'RECEIVE_ACCEPTED_PRAYER_REQUEST',
        prayerChannel: '123456',
        hostChannel: '789012',
        cancelled: false,
      }
    );
    expect(dispatch.mock.calls[1][0]).toEqual(
      {
        type: 'RECEIVE_ACCEPTED_PRAYER_REQUEST',
        prayerChannel: '123456',
        hostChannel: '789012',
        cancelled: true,
      }
    );
  });

  test('Receive publish notification to host channel', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(_store);

    const chat = new Chat(dispatch, getState);

    chat.init();

    __messageEvent(
      {
        channel: 'Host',
        message: {
          action: 'livePrayerAccepted',
          channel: 'Host',
          data: {
            hostName: 'G. Boole',
            guestName: 'Billy',
            channel: 'Host',
            timestamp: '1543253210',
          },
        },
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    // expect(dispatch.mock.calls[0][0]).toEqual(
    //   {
    //     type: 'RECEIVE_MOMENT',
    //     channel: '789012',
    //     moment: {
    //       type: 'NOTIFICATION',
    //       notificationType: 'PRAYER',
    //       id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
    //       host: 'G. Boole',
    //       guest: 'Billy',
    //       timestamp: '11:26am',
    //     },
    //   }
    // );
  });

  test('Here Now', () => {
    const actors = actorMiddleware(Chat);
    const store = createStore(
      reducer,
      {
        feed: _store,
      },
      applyMiddleware(actors)
    );

    mockHereNow.mockImplementation((config, callback) => {
      callback(null, {
        channels: {
          '123456': {
            occupants: [
              {
                uuid: 'xyz',
                state: {
                  available_prayer: false, // eslint-disable-line camelcase
                },
              },
              {
                uuid: 'abc',
                state: {
                  available_prayer: true, // eslint-disable-line camelcase
                },
              },
            ],
          },
        },
      });
    });

    store.dispatch(
      {
        type: 'SET_PUBNUB_KEYS',
        publish: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
        subscribe: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
      }
    );

    store.dispatch(
      addChannel(
        'public',
        '123456',
        false,
        [])
    );

    expect(getAvailableForPrayer(store.getState().feed)).toEqual(
      [
        {
          id: 'abc',
          state: {
            available_prayer: true, // eslint-disable-line camelcase
          },
        },
      ]
    );

    __presenceEvent(
      {
        action: 'join',
        channel: '123456',
        state: {
          available_prayer: true, // eslint-disable-line camelcase
        },
        uuid: 'nop',
      }
    );

    expect(getAvailableForPrayer(store.getState().feed)).toEqual(
      [
        {
          id: 'abc',
          state: {
            available_prayer: true, // eslint-disable-line camelcase
          },
        },
        {
          id: 'nop',
          state: {
            available_prayer: true, // eslint-disable-line camelcase
          },
        },
      ]
    );

    __presenceEvent(
      {
        action: 'leave',
        channel: '123456',
        state: {
          available_prayer: true, // eslint-disable-line camelcase
        },
        uuid: 'abc',
      }
    );

    expect(getAvailableForPrayer(store.getState().feed)).toEqual(
      [
        {
          id: 'nop',
          state: {
            available_prayer: true, // eslint-disable-line camelcase
          },
        },
      ]
    );
  });

  test('Accept prayer request', () => {

  });
});
