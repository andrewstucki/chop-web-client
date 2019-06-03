// @flow
import { defaultState } from '../../src/chop/dux';
import { __messageEvent, __presenceEvent, mockHereNow } from 'pubnub';
import Chat from '../../src/io/chat';
import Converter from '../../src/io/converter';
jest.mock('pubnub');

describe('Prayer Request Tests', () => {
  const _store = {
    ...defaultState,
    subscriber: {
      ...defaultState.subscriber,
      currentSubscriber: {
        id: '134',
        nickname: 'Kylo Ren',
        avatar: 'http://someimageons3.com/image/123',
        role: {
          label: 'Supreme Leader of the First Order',
          permissions: ['event.event.manage', 'feed.direct.accept'],
        },
        pubnubAccessKey: '1533912921585',
        preferences: {
          textMode: 'COMPACT',
        },
      },
    },
    feed: {
      ...defaultState.feed,
      event: {
        id: '320418',
        eventTimeId: '1920834',
        startTime: 1529425800000,
        endTime: 1529425900000,
        title: 'When Pigs Fly - Week 2',
        timezone: 'Central',
        enabledFeatures: {
          chat: true,
        },
      },
      organization: {
        id: 2,
        name: 'Life.Church',
        logoUrl: '',
        theme: {
          headerBackgroundColor: '',
          headerMenuIconColor: '',
        },
      },
      pubnubKeys: {
        publish: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
        subscribe: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
      },
      channels: {
        ...defaultState.feed.channels,
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
    },
  };

  const dispatch = jest.fn();
  const getState = jest.fn();
  getState.mockReturnValue(_store);

  Converter.config(getState);

  const chat = new Chat(dispatch, getState);
  chat.init();

  afterEach(() => {
    dispatch.mockClear();
    getState.mockClear();
    mockHereNow.mockClear();
  });

  test('Receive prayer request from legacy', () => {
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
          subscriber: {
            nickname: 'JarJar',
          },
          active: true,
          timestamp: expect.stringMatching(/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/),
        },
      }
    );
  });

  test('Receive accepted prayer request', () => {
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
});
