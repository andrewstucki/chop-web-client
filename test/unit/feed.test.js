// @flow
import reducer, {
  addChannel,
  removeChannel,
  defaultState,
  leaveChannel,
  setUser,
  setSalvations,
  updateScrollPosition,
} from '../../src/feed/dux';

import {
  togglePopUpModal,
} from '../../src/popUpModal/dux';

import {
  feedContents as feedContentsSelector,
  feedAnchorMoments,
  hasNotSeenLatestMoments,
} from '../../src/selectors/channelSelectors';

import {
  getOtherUsers,
} from '../../src/selectors/chatSelectors';

import {
  receiveMoment,
} from '../../src/moment/dux';

import {
  closeMenu,
  openMenu,
} from '../../src/sideMenu/dux';

import { setVideo } from '../../src/videoFeed/dux';

import { SET_CHAT_FOCUS, SET_KEYBOARD_HEIGHT } from '../../src/chat/dux';

import {
  openMessageTray,
  closeMessageTray,
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

const otherUser = {
  id: 12345,
  pubnubToken: '12345',
  avatar: null,
  name: 'Billy Bob',
  role: {
    label: '',
  },
};
const currentUser = {
  id: 12345,
  pubnubToken: '09876',
  pubnubAccessKey: '67890',
  avatar: null,
  name: 'Joan Jet',
  role: {
    label: '',
    permissions: [],
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

  test('adds a message to current channel from current user', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
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
        chatInput: 'this is a message',
        currentUser: currentUser,
      },
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'public',
        moment: {
          type: 'MESSAGE',
          id: '54321',
          text: 'this is a message',
          sender: currentUser,
          messageTrayOpen: false,
        },
      },
    );
    expect(result.channels.public.moments.length).toEqual(1);
    expect(result.channels.public.moments[0].text).toEqual('this is a message');
    expect(result.channels.public.moments[0].sender.id).toEqual(12345);
    expect(result.channels.public.moments[0].sender.name).toEqual('Joan Jet');
  });

  test('adds a message to current channel not public from current user', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
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
        chatInput: 'this is a string',
        currentUser: currentUser,
      },
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'host',
        moment: {
          type: 'MESSAGE',
          id: '54321',
          text: 'this is a string',
          sender: otherUser,
          messageTrayOpen: false,
        },
      },
    );
    expect(result.channels.public.moments.length).toEqual(0);
    expect(result.channels.host.moments.length).toEqual(1);
    expect(result.channels.host.moments[0].text).toEqual('this is a string');
    expect(result.channels.host.moments[0].sender.pubnubToken).toEqual('12345');
    expect(result.channels.host.moments[0].sender.name).toEqual('Billy Bob');
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
        sender: {
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
        user: otherUser,
        timestamp: '4:53pm',
        active: true,
        action: action,
      }),
    );
    expect(result.channels.host.moments.length).toEqual(1);
    expect(result.channels.host.moments[0].id.length).toEqual(5);
    expect(result.channels.host.moments[0].user.pubnubToken).toEqual('12345');
    expect(result.channels.host.moments[0].user.name).toEqual('Billy Bob');
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
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
          },
        },
      },
      addChannel('host', '12345', false),
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
          },
          '12345': {
            id: '12345',
            moments: [],
            anchorMoments: [],
            name: 'host',
            direct: false,
            placeholder: false,
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
      addChannel('direct', '12345', true, [otherUser]),
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          '12345': {
            id: '12345',
            direct: true,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            name: 'direct',
            participants: [
              otherUser,
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
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
          },
        },
      }
      , addChannel('host', '12345', false));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          '12345': {
            id: '12345',
            name: 'host',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
                sender: {
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
        currentUser: currentUser,
      },
      'public',
    );
    expect(result).toEqual(
      [
        {
          type: MESSAGE,
          id: '12345',
          text: 'I like socks',
          sender: {
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
                sender: {
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
        currentUser: currentUser,
      },
      'host',
    );
    expect(result).toEqual(
      [
        {
          type: MESSAGE,
          id: '12345',
          text: 'I like socks',
          sender: {
            id: '12345',
            name: 'Billy Bob',
          },
          messageTrayOpen: false,
        },
      ],
    );
  });

  test('feedContents selector works without a channel', () => {
    expect(feedContentsSelector(defaultState, 'public')).toEqual([]);
  });

  test('feedContents selector returns translations', () => {
    const result = feedContentsSelector(
      {
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
                sender: {
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
        currentUser: currentUser,
      },
      'public',
    );
    expect(result).toEqual(
      [
        {
          type: MESSAGE,
          id: '12345',
          text: '나는 양말을 좋아한다.',
          sender: {
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

  test('Accepts a user', () => {
    const { lastAction, ...result } = reducer(defaultState, setUser(currentUser)); // eslint-disable-line no-unused-vars
    expect(result).toEqual(
      {
        ...defaultState,
        currentUser: currentUser,
      },
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
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                sender: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: false,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                sender: {
                  id: '12345',
                  name: 'William',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
      openMessageTray('public', '123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                sender: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                sender: {
                  id: '12345',
                  name: 'William',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                sender: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: false,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                sender: {
                  id: '12345',
                  name: 'William',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
      openMessageTray('host', '123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                sender: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                sender: {
                  id: '12345',
                  name: 'William',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                sender: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                sender: {
                  id: '12345',
                  name: 'William',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
      closeMessageTray('public', '123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                sender: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: false,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                sender: {
                  id: '12345',
                  name: 'William',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                sender: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '189',
                text: 'Hello Billy Bob',
                sender: {
                  id: '14543',
                  name: 'Jenny Jane',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '204',
                text: 'George is very angry',
                sender: {
                  id: '18475',
                  name: 'George Costanza',
                },
                messageTrayOpen: true,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '189',
                text: 'Hello Billy Bob',
                sender: {
                  id: '14543',
                  name: 'Jenny Jane',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '204',
                text: 'George is very angry',
                sender: {
                  id: '18475',
                  name: 'George Costanza',
                },
                messageTrayOpen: true,
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            participants: [],
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
            direct: false, placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            participants: [],
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
            direct: false, placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            participants: [],
          },
        },
      },
    );
  });

  // TODO this won't go in event, but I don't know where else to put it right now
  test('Can publish an AvatarMoment in event channel', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            direct: false, placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
          },
        },
      },
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'public',
        moment: {
          type: 'AVATAR_MOMENT',
          id: '12345',
          user: {
            id: '6789',
            name: 'Madmartigan',
          },
        },
      },
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
            direct: false, placeholder: false,
            moments: [
              {
                type: 'AVATAR_MOMENT',
                id: '12345',
                user: {
                  id: '6789',
                  name: 'Madmartigan',
                },
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            direct: false, placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
          },
        },
      },
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'host',
        moment: {
          type: 'ACTIONABLE_NOTIFICATION',
          notificationType: 'PRAYER_REQUEST',
          user: {
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
            direct: false, placeholder: false,
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: '12345',
                user: {
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
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
          text: 'I commit my life to Christ.',
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
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [
              {
                type: 'ANCHOR_MOMENT',
                anchorMomentType: 'SALVATION',
                id: '12345',
                text: 'I commit my life to Christ.',
              },
            ],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [
              {
                type: 'ANCHOR_MOMENT',
                anchorMomentType: 'SALVATION',
                id: '12345',
                text: 'I commit my life to Christ.',
              },
            ],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'ANCHOR_MOMENT',
                anchorMomentType: 'SALVATION',
                id: '12345',
                text: 'I commit my life to Christ.',
              },
            ],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: 'moment1',
                user: {
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
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: 'moment1',
                user: {
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
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: 'moment1',
                user: {
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
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: 'moment1',
                user: {
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
            participants: [],
          },
        },
      },
    );
  });

  test('getOtherUsers', () => {
    const result = getOtherUsers(
      {
        ...defaultState,
        channels: {
          direct: {
            id: '12345',
            name: 'Carl',
            moments: [],
            anchorMoments: [],
            participants: [
              {
                pubnubToken: currentUser.pubnubToken,
                name: currentUser.name,
                role: {
                  label: currentUser.role.label,
                },
              },
              otherUser,
            ],
          },
        },
        currentUser: currentUser,
      },
      'direct',
    );
    expect(result).toEqual(
      [otherUser],
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
            direct: true,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            participants: [
              {
                id: 12345,
                pubnubToken: currentUser.pubnubToken,
                avatar: currentUser.avatar,
                name: currentUser.name,
                role: {
                  label: currentUser.role.label,
                },
              },
              otherUser,
            ],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
          public: {
            id: '67890',
            name: 'Public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            participants: [],
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
        currentUser: currentUser,
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
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            participants: [],
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
        currentUser: currentUser,
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

  test('keyboard height', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
      },
      {
        type: SET_KEYBOARD_HEIGHT,
        height: 300,
      });

    expect(result).toEqual({
      ...defaultState,
      keyboardHeight: 300,
    });
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
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: -1,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 31,
            sawLastMomentAt: 1546896104521,
            participants: [],
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
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '189',
                text: 'Hello Billy Bob',
                sender: {
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
                sender: {
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
            direct: false,
            placeholder: false,
            moments: [
              {
                type: MESSAGE,
                id: '189',
                text: 'Hello Billy Bob',
                sender: {
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
                sender: {
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
