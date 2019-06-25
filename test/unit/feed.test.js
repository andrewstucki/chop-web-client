// @flow
import reducer, {
  addChannel,
  removeChannel,
  defaultState,
  leaveChannel,
  setSalvations,
  updateScrollPosition,
} from '../../src/feed/dux';
import { defaultState as defaultChopState } from '../../src/chop/dux';
import {
  togglePopUpModal,
} from '../../src/popUpModal/dux';

import {
  feedContents as feedContentsSelector,
  feedAnchorMoments,
  hasNotSeenLatestMoments,
} from '../../src/selectors/channelSelectors';

import {
  getOtherSubscribers,
} from '../../src/selectors/chatSelectors';

import {
  receiveMoment,
} from '../../src/moment/dux';

import {
  closeMenu,
  openMenu,
} from '../../src/sideMenu/dux';

import { setVideo } from '../../src/videoFeed/dux';

import { SET_CHAT_FOCUS } from '../../src/chat/dux';

import {
  toggleMessageTray,
  deleteMessage,
  publishAcceptedPrayerRequest,
  receiveAcceptedPrayerRequest,
  MESSAGE,
} from '../../src/moment';

import {
  releaseAnchorMoment,
  SET_ANCHOR_MOMENT,
} from '../../src/anchorMoment/dux';

import { mockDate } from '../testUtils';

import { setLanguage } from '../../src/languageSelector/dux';

import { setPrimaryPane } from '../../src/pane/dux';
import type {PrivateSubscriberType} from '../../src/subscriber/dux';

const otherSubscriber = {
  id: '12345',
  avatar: null,
  nickname: 'Billy Bob',
  role: {
    label: '',
  },
};

const currentSubscriber: PrivateSubscriberType = {
  id: '09876',
  pubnubAccessKey: '67890',
  avatar: null,
  nickname: 'Joan Jet',
  firstName: 'Joan',
  lastName: 'Jet',
  email: 'joanjet@theblackharts.rock',
  phoneNumber: '867-5309',
  role: {
    label: '',
    permissions: [],
  },
  preferences: {
    textMode: 'COMPACT',
  },
};

describe('Feed tests', () => {
  // mockDate('Wed Jun 27 2018 16:53:06 GMT-0500');

  test('default state', () => {
    const result = reducer();
    expect(result).toEqual(defaultState);
  });

  test('change current channel', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
          host: {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
      }
      , setPrimaryPane('CHAT', 'host'));

    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
          host: {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
        panes: {
          primary: {
            type: 'CHAT',
            content: {
              channelId: 'host',
            },
          },
        },
      },
    );
  });

  test('adds a message to current channel from current subscriber', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            content: {
              channelId: 'public',
            },
          },
        },
        currentSubscriber: currentSubscriber,
      },
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'public',
        moment: {
          type: 'MESSAGE',
          id: '54321',
          text: 'this is a message',
          subscriber: currentSubscriber,
          messageTrayOpen: false,
        },
      },
    );
    expect(result.channels.public.moments.length).toEqual(1);
    expect(result.channels.public.moments[0].text).toEqual('this is a message');
    expect(result.channels.public.moments[0].subscriber.id).toEqual('09876');
    expect(result.channels.public.moments[0].subscriber.nickname).toEqual('Joan Jet');
  });

  test('adds a message to current channel not public from current subscriber', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
          host: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
        panes: {
          primary: {
            type: 'CHAT',
            content: {
              channelId: 'host',
            },
          },
        },
        currentSubscriber: currentSubscriber,
      },
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'host',
        moment: {
          type: 'MESSAGE',
          id: '54321',
          text: 'this is a string',
          subscriber: otherSubscriber,
          messageTrayOpen: false,
        },
      },
    );
    expect(result.channels.public.moments.length).toEqual(0);
    expect(result.channels.host.moments.length).toEqual(1);
    expect(result.channels.host.moments[0].text).toEqual('this is a string');
    expect(result.channels.host.moments[0].subscriber.id).toEqual('12345');
    expect(result.channels.host.moments[0].subscriber.nickname).toEqual('Billy Bob');
  });

  test('receives a message and adds it to the appropriate channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
          host: {
            id: '67890',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
      },
      receiveMoment('host', {
        type: 'MESSAGE',
        id: '12345',
        text: 'Hello there',
        subscriber: {
          id: '',
          name: '',
        },
        messageTrayOpen: false,
      }),
    );
    expect(result.channels.public.moments.length).toEqual(0);
    expect(result.channels.host.moments.length).toEqual(1);
    expect(result.channels.host.moments[0].text).toEqual('Hello there');
    expect(result.channels.host.moments[0].id.length).toEqual(5);
  });

  test('adds a prayer request to host', () => {
    const action = () => {
    };
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
          host: {
            id: '67890',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
      },
      receiveMoment('host', {
        type: 'ACTIONABLE_NOTIFICATION',
        notificationType: 'PRAYER_REQUEST',
        id: '12345',
        subscriber: otherSubscriber,
        timestamp: '4:53pm',
        active: true,
        action: action,
      }),
    );
    expect(result.channels.host.moments.length).toEqual(1);
    expect(result.channels.host.moments[0].id.length).toEqual(5);
    expect(result.channels.host.moments[0].subscriber.id).toEqual('12345');
    expect(result.channels.host.moments[0].subscriber.nickname).toEqual('Billy Bob');
    expect(result.channels.host.moments[0].timestamp).toEqual('4:53pm');
    expect(result.channels.host.moments[0].active).toEqual(true);
    expect(result.channels.host.moments[0].action).toEqual(action);
  });

  test('add a channel', () => {
    mockDate(1546896104521);

    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      addChannel('host', '12345', 'host', false),
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
          '12345': {
            id: '12345',
            type: 'host',
            moments: [],
            anchorMoments: [],
            name: 'host',
            direct: false,
            placeholder: false,
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });

  test('add a channel', () => {
    mockDate(1546896104521);
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
      },
      addChannel('direct', '12345', 'direct', true, [otherSubscriber]),
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          '12345': {
            id: '12345',
            type: 'direct',
            direct: true,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            name: 'direct',
            subscribers: [
              otherSubscriber,
            ],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
      },
    );
  });

  test('add a channel that already exists', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          '12345': {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      }
      , addChannel('host', '12345', 'host', false));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          '12345': {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });

  test('remove channel', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          other: {
            id: '12345',
            name: 'other',
            type: 'direct',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      removeChannel('other'));
    expect(result).toEqual(defaultState);
  });

  test('remove current channel', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          other: {
            id: '12345',
            name: 'other',
            type: 'direct',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
      },
      removeChannel('other'),
    );
    expect(result).toEqual(defaultState);
  });

  test('Feed contents', () => {
    const result = feedContentsSelector(
      {
        ...defaultChopState,
        feed: {
          ...defaultState,
          channels: {
            public: {
              id: '12345',
              name: 'public',
              moments: [
                {
                  type: MESSAGE,
                  id: '12345',
                  text: 'I like socks',
                  subscriber: {
                    id: '12345',
                    name: 'Billy Bob',
                  },
                  messageTrayOpen: false,
                },
              ],
              anchorMoments: [],
              scrollPosition: 0,
              sawLastMomentAt: 1546896104521,
            },
          },
        },
        subscriber: {
          ...defaultChopState.subscriber,
          currentSubscriber: currentSubscriber,
        },
      },
      'public',
    );
    expect(result).toEqual(
      [
        {
          type: MESSAGE,
          id: '12345',
          text: 'I like socks',
          subscriber: {
            id: '12345',
            name: 'Billy Bob',
          },
          messageTrayOpen: false,
        },
      ],
    );
  });

  test('Feed contents not public', () => {
    const result = feedContentsSelector(
      {
        ...defaultChopState,
        feed: {
          ...defaultState,
          channels: {
            public: {
              id: '12345',
              name: 'public',
              moments: [],
              anchorMoments: [],
              scrollPosition: 0,
              sawLastMomentAt: 1546896104521,
            },
            host: {
              id: '12345',
              name: 'host',
              moments: [
                {
                  type: MESSAGE,
                  id: '12345',
                  text: 'I like socks',
                  subscriber: {
                    id: '12345',
                    name: 'Billy Bob',
                  },
                  messageTrayOpen: false,
                },
              ],
              anchorMoments: [],
              scrollPosition: 0,
            },
          },
        },
        subscriber: {
          ...defaultChopState.subscriber,
          currentSubscriber: currentSubscriber,
        },
      },
      'host',
    );
    expect(result).toEqual(
      [
        {
          type: MESSAGE,
          id: '12345',
          text: 'I like socks',
          subscriber: {
            id: '12345',
            name: 'Billy Bob',
          },
          messageTrayOpen: false,
        },
      ],
    );
  });

  test('feedContents selector works without a channel', () => {
    expect(feedContentsSelector(defaultChopState, 'public')).toEqual([]);
  });

  test('feedContents selector returns translations', () => {
    const result = feedContentsSelector(
      {
        ...defaultChopState,
        feed: {
          channels: {
            public: {
              id: '12345',
              name: 'public',
              moments: [
                {
                  type: MESSAGE,
                  id: '12345',
                  timestamp: '2019/05/29',
                  text: 'I like socks',
                  subscriber: {
                    id: '12345',
                    name: 'Billy Bob',
                  },
                  messageTrayOpen: false,
                  translations: [
                    {
                      languageCode: 'en',
                      text: 'I like socks',
                    },
                    {
                      languageCode: 'ko',
                      text: '나는 양말을 좋아한다.',
                    },
                  ],
                },
              ],
              anchorMoments: [],
              scrollPosition: 0,
              sawLastMomentAt: 1546896104521,
            },
          },
          currentLanguage: 'ko',
        },
        subscriber: {
          ...defaultChopState.subscriber,
          currentSubscriber: currentSubscriber,
        },
      },
      'public',
    );
    expect(result).toEqual(
      [
        {
          type: MESSAGE,
          id: '12345',
          text: '나는 양말을 좋아한다.',
          timestamp: '2019/05/29',
          subscriber: {
            id: '12345',
            name: 'Billy Bob',
          },
          messageTrayOpen: false,
          translations: [
            {
              languageCode: 'en',
              text: 'I like socks',
            },
            {
              languageCode: 'ko',
              text: '나는 양말을 좋아한다.',
            },
          ],
        },
      ],
    );
  });

  test('feedContents selector returns translations with region', () => {
    const result = feedContentsSelector(
      {
        ...defaultChopState,
        feed: {
          ...defaultState,
          channels: {
            public: {
              id: '12345',
              name: 'public',
              moments: [
                {
                  type: MESSAGE,
                  id: '12345',
                  text: 'I like socks',
                  subscriber: {
                    id: '12345',
                    name: 'Billy Bob',
                  },
                  messageTrayOpen: false,
                  translations: [
                    {
                      languageCode: 'en',
                      text: 'I like socks',
                    },
                    {
                      languageCode: 'ko',
                      text: '나는 양말을 좋아한다.',
                    },
                  ],
                },
              ],
              anchorMoments: [],
              scrollPosition: 0,
              sawLastMomentAt: 1546896104521,
            },
          },
          currentLanguage: 'en-US',
        },
        subscriber: {
          ...defaultChopState.subscriber,
          currentSubscriber: currentSubscriber,
        },
      },
      'public',
    );
    expect(result).toEqual(
      [
        {
          type: MESSAGE,
          id: '12345',
          text: 'I like socks',
          subscriber: {
            id: '12345',
            name: 'Billy Bob',
          },
          messageTrayOpen: false,
          translations: [
            {
              languageCode: 'en',
              text: 'I like socks',
            },
            {
              languageCode: 'ko',
              text: '나는 양말을 좋아한다.',
            },
          ],
        },
      ],
    );
  });

  test('feedAnchorMoments selector with no anchor moments', () => {
    expect(feedAnchorMoments(defaultState, 'public')).toEqual([]);
  });

  test('feedAncorMoments selector with moments', () => {
    const result = feedAnchorMoments(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [],
            anchorMoments: [
              {
                id: '1234',
              },
              {
                id: '6789',
              },
            ],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
      },
      'public',
    );
    expect(result).toEqual(
      [
        {
          id: '1234',
        },
        {
          id: '6789',
        },
      ],
    );
  });


  test('Opens only the correct message tray public channel', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                subscriber: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: false,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                subscriber: {
                  id: '12345',
                  name: 'William',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            content: {
              channelId: 'public',
            },
          },
        },
      },
      toggleMessageTray('public', '123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                subscriber: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                subscriber: {
                  id: '12345',
                  name: 'William',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            content: {
              channelId: 'public',
            },
          },
        },
      },
    );
  });

  test('Opens only the correct message tray not public channel', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                subscriber: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: false,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                subscriber: {
                  id: '12345',
                  name: 'William',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
        panes: {
          primary: {
            type: 'CHAT',
            content: {
              channelId: 'host',
            },
          },
        },
      },
      toggleMessageTray('host', '123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                subscriber: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                subscriber: {
                  id: '12345',
                  name: 'William',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
        panes: {
          primary: {
            type: 'CHAT',
            content: {
              channelId: 'host',
            },
          },
        },
      },
    );
  });

  test('Closes only the correct message tray public channel', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                subscriber: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                subscriber: {
                  id: '12345',
                  name: 'William',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            content: {
              channelId: 'public',
            },
          },
        },
      },
      toggleMessageTray('public', '123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                subscriber: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: false,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                subscriber: {
                  id: '12345',
                  name: 'William',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            content: {
              channelId: 'public',
            },
          },
        },
      },
    );
  });

  test('Can delete a message', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                subscriber: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '189',
                text: 'Hello Billy Bob',
                subscriber: {
                  id: '14543',
                  name: 'Jenny Jane',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '204',
                text: 'George is very angry',
                subscriber: {
                  id: '18475',
                  name: 'George Costanza',
                },
                messageTrayOpen: true,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      deleteMessage('123', 'public'),
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '189',
                text: 'Hello Billy Bob',
                subscriber: {
                  id: '14543',
                  name: 'Jenny Jane',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '204',
                text: 'George is very angry',
                subscriber: {
                  id: '18475',
                  name: 'George Costanza',
                },
                messageTrayOpen: true,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });

  test('Can publish a prayer notification', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'host',
        moment: {
          type: 'NOTIFICATION',
          notificationType: 'PRAYER',
          id: '12345',
          host: 'Boofie',
          guest: 'Beefie',
          timestamp: '4:53pm',
        },
      },
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'NOTIFICATION',
                notificationType: 'PRAYER',
                id: '12345',
                host: 'Boofie',
                guest: 'Beefie',
                timestamp: '4:53pm',
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });

  test('Can publish a joined chat notification public', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'public',
        moment: {
          type: 'NOTIFICATION',
          notificationType: 'JOINED_CHAT',
          id: '12345',
          name: 'Boofie',
          timestamp: '4:53pm',
        },
      },
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'NOTIFICATION',
                notificationType: 'JOINED_CHAT',
                id: '12345',
                name: 'Boofie',
                timestamp: '4:53pm',
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });

  test('Can publish a joined chat notification host', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'host',
        moment: {
          type: 'NOTIFICATION',
          notificationType: 'JOINED_CHAT',
          id: '12345',
          name: 'Boofie',
          timestamp: '4:53pm',
        },
      },
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false, placeholder: false,
            moments: [
              {
                type: 'NOTIFICATION',
                notificationType: 'JOINED_CHAT',
                id: '12345',
                name: 'Boofie',
                timestamp: '4:53pm',
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });

  test('Can publish a left chat notification public', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false, placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'public',
        moment: {
          type: 'NOTIFICATION',
          notificationType: 'LEFT_CHAT',
          id: '12345',
          name: 'Boofie',
          timestamp: '4:53pm',
        },
      },
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false, placeholder: false,
            moments: [
              {
                type: 'NOTIFICATION',
                notificationType: 'LEFT_CHAT',
                id: '12345',
                name: 'Boofie',
                timestamp: '4:53pm',
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });

  test('Can publish a left chat notification host', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false, placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'host',
        moment: {
          type: 'NOTIFICATION',
          notificationType: 'LEFT_CHAT',
          id: '12345',
          name: 'Boofie',
          timestamp: '4:53pm',
        },
      },
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          host: {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'NOTIFICATION',
                notificationType: 'LEFT_CHAT',
                id: '12345',
                name: 'Boofie',
                timestamp: '4:53pm',
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });

  test('Can publish a prayer request notification host', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'host',
        moment: {
          type: 'ACTIONABLE_NOTIFICATION',
          notificationType: 'PRAYER_REQUEST',
          subscriber: {
            id: '5893',
            name: 'Boofie',
          },
          id: '12345',
          timestamp: '4:53pm',
          active: true,
        },
      },
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          host: {
            id: '12345',
            name: 'host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: '12345',
                subscriber: {
                  id: '5893',
                  name: 'Boofie',
                },
                timestamp: '4:53pm',
                active: true,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });

  test('Store anchorMoment from publishSalvation', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      {
        type: SET_ANCHOR_MOMENT,
        channel: 'public',
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          anchorMomentType: 'SALVATION',
          id: '12345',
        },
      },
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [
              {
                type: 'ANCHOR_MOMENT',
                anchorMomentType: 'SALVATION',
                id: '12345',
              },
            ],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });

  test('Can publish an anchor moment as a moment and remove it from anchorMoment', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [
              {
                type: 'ANCHOR_MOMENT',
                anchorMomentType: 'SALVATION',
                id: '12345',
              },
            ],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      releaseAnchorMoment('public', '12345'),
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'ANCHOR_MOMENT',
                anchorMomentType: 'SALVATION',
                id: '12345',
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });

  test('Set salvations', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
      },
      setSalvations(4),
    );
    expect(result).toEqual(
      {
        ...defaultState,
        salvations: 4,
      },
    );
  });

  test('Publish accepted prayer request', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          ['12345']: {
            id: '12345',
            name: 'Host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: 'moment1',
                subscriber: {
                  id: 67890,
                  avatar: null,
                  name: 'Burglekutt',
                },
                timestamp: '4:53pm',
                active: true,
                prayerChannel: '123456',
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      publishAcceptedPrayerRequest(
        '123456',
        '12345',
        {
          id: 67890,
          avatar: null,
          pubnubToken: 1234,
          name: 'Burglekutt',
        },
        false)
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ['12345']: {
            id: '12345',
            name: 'Host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: 'moment1',
                subscriber: {
                  id: 67890,
                  avatar: null,
                  name: 'Burglekutt',
                },
                timestamp: '4:53pm',
                active: false,
                cancelled: false,
                prayerChannel: '123456',
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });

  test('Receive accepted prayer request', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          ['12345']: {
            id: '12345',
            name: 'Host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: 'moment1',
                subscriber: {
                  id: 67890,
                  avatar: null,
                  name: 'Burglekutt',
                },
                timestamp: '4:53pm',
                active: true,
                prayerChannel: '123456',
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      receiveAcceptedPrayerRequest('123456', '12345'),
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ['12345']: {
            id: '12345',
            name: 'Host',
            type: 'host',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: 'moment1',
                subscriber: {
                  id: 67890,
                  avatar: null,
                  name: 'Burglekutt',
                },
                timestamp: '4:53pm',
                active: false,
                prayerChannel: '123456',
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });

  test('getOtherSubscribers', () => {
    const result = getOtherSubscribers(
      {
        ...defaultState,
        channels: {
          direct: {
            id: '12345',
            name: 'Carl',
            moments: [],
            anchorMoments: [],
            subscribers: [
              {
                id: currentSubscriber.id,
                nickname: currentSubscriber.nickname,
                role: {
                  label: currentSubscriber.role.label,
                },
              },
              otherSubscriber,
            ],
          },
        },
        currentSubscriber: currentSubscriber,
      },
      'direct',
    );
    expect(result).toEqual(
      [otherSubscriber],
    );
  });

  test('togglePopUpModal', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        isPopUpModalVisible: false,
      },
      togglePopUpModal(),
    );
    expect(result).toEqual(
      {
        ...defaultState,
        isPopUpModalVisible: true,
      },
    );
  });

  test('leaveChannel', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          direct: {
            id: '12345',
            name: 'Carl',
            type: 'direct',
            direct: true,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            subscribers: [
              {
                id: currentSubscriber.id,
                avatar: currentSubscriber.avatar,
                nickname: currentSubscriber.nickname,
                role: {
                  label: currentSubscriber.role.label,
                },
              },
              otherSubscriber,
            ],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
          public: {
            id: '67890',
            name: 'Public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            subscribers: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
        panes: {
          primary: {
            type: 'CHAT',
            content: {
              channelId: 'direct',
            },
          },
        },
        currentSubscriber: currentSubscriber,
      },
      leaveChannel('direct'),
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '67890',
            name: 'Public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            subscribers: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            content: {
              channelId: 'public',
            },
          },
        },
        currentSubscriber: currentSubscriber,
      },
    );
  });
});

describe('Chat tests', () => {
  test('chat focus', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
      },
      {
        type: SET_CHAT_FOCUS,
        channel: 'abc',
      });
    expect(result).toEqual(
      {
        ...defaultState,
        focusedChannel: 'abc',
      },
    );
  });
});

describe('SideMenu tests', () => {
  test('Close sideMenu', () => {
    const { lastAction, ...results } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        isSideMenuClosed: false,
      },
      closeMenu(),
    );
    expect(results).toEqual(
      {
        ...defaultState,
        isSideMenuClosed: true,
      },
    );
  });

  test('Close menu does not toggle when already true', () => {
    const { lastAction, ...results } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        isSideMenuClosed: true,
      },
      closeMenu(),
    );
    expect(results).toEqual(
      {
        ...defaultState,
        isSideMenuClosed: true,
      },
    );
  });

  test('Open sideMenu', () => {
    const { lastAction, ...results } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        isSideMenuClosed: true,
      },
      openMenu(),
    );
    expect(results).toEqual(
      {
        ...defaultState,
        isSideMenuClosed: false,
      },
    );
  });

  test('Open sideMenu does not toggle when already false', () => {
    const { lastAction, ...results } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        isSideMenuClosed: false,
      },
      openMenu(),
    );
    expect(results).toEqual(
      {
        ...defaultState,
        isSideMenuClosed: false,
      },
    );
  });

  test('Update scroll position', () => {
    const { lastAction, ...results } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: -1,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
      updateScrollPosition(31, 'public', 1546896104521),
    );
    expect(results).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 31,
            sawLastMomentAt: 1546896104521,
            subscribers: [],
          },
        },
      },
    );
  });
});

describe('VideoFeed tests', () => {
  test('set url', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      defaultState,
      setVideo('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'videoFeed')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        isVideoHidden: false,
        video: {
          ...defaultState.video,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          type: 'videoFeed',
        },
      },
    );
  });
});

describe('LanguageSelector tests', () => {
  test('SetLanguage Japanese', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        currentLanguage: 'en',
      },
      setLanguage('ko'),
    );
    expect(result).toEqual(
      {
        ...defaultState,
        currentLanguage: 'ko',
      },
    );
  });

  describe('hasNotSeenLatestMoments', () => {
    test('is true when message timestamps are newer then sawLastMomentAt', () => {
      const state = {
        ...defaultState,
        channels: {
          '12345': {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '189',
                text: 'Hello Billy Bob',
                subscriber: {
                  id: '14543',
                  name: 'Jenny Jane',
                },
                messageTrayOpen: true,
                timestamp: 1546896104520,
              },
              {
                type: MESSAGE,
                id: '204',
                text: 'George is very angry',
                subscriber: {
                  id: '18475',
                  name: 'George Costanza',
                },
                messageTrayOpen: true,
                timestamp: 1546896104522,
              },
            ],
            anchorMoments: [],
            scrollPosition: 31,
            sawLastMomentAt: 1546896104521,
          },
        },
      };
      const channelId = '12345';
      expect(hasNotSeenLatestMoments(state, channelId)).toBeTruthy();
    });

    test('is false when message timestamps are older then sawLastMomentAt', () => {
      const state = {
        ...defaultState,
        channels: {
          '12345': {
            id: '12345',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '189',
                text: 'Hello Billy Bob',
                subscriber: {
                  id: '14543',
                  name: 'Jenny Jane',
                },
                messageTrayOpen: true,
                timestamp: 1546896104519,
              },
              {
                type: MESSAGE,
                id: '204',
                text: 'George is very angry',
                subscriber: {
                  id: '18475',
                  name: 'George Costanza',
                },
                messageTrayOpen: true,
                timestamp: 1546896104520,
              },
            ],
            anchorMoments: [],
            scrollPosition: 31,
            sawLastMomentAt: 1546896104521,
          },
        },
      };
      const channelId = '12345';
      expect(hasNotSeenLatestMoments(state, channelId)).toBeFalsy();
    });
  });
});
