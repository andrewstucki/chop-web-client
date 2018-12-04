// @flow
import reducer, {
  addChannel,
  removeChannel,
  defaultState,
  togglePopUpModal,
  leaveChannel,
  setUser,
  setSalvations,
} from '../../src/feed/dux';

import {
  hasParticipants as hasParticipantsSelector,
  feedContents as feedContentsSelector,
  feedAnchorMoments,
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

import { TOGGLE_CHAT_FOCUS } from '../../src/chat/dux';

import {
  openMessageTray,
  closeMessageTray,
  deleteMessage,
  toggleCloseTrayButton,
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
  pubnubToken: '12345',
  name: 'Billy Bob',
  role: {
    label: '',
  },
};
const currentUser = {
  id: '12345',
  pubnubToken: '09876',
  pubnubAccessKey: '67890',
  name: 'Joan Jet',
  role: {
    label: '',
    permissions: [],
  },
};

describe('Feed tests', () => {
  mockDate('Wed Jun 27 2018 16:53:06 GMT-0500');

  test('default state', () => {
    const result = reducer();
    expect(result).toEqual(defaultState);
  });

  test('change current channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
            moments: [],
            anchorMoments: [],
          },
          host: {
            id: '12345',
            name: 'host',
            moments: [],
            anchorMoments: [],
          },
        },
      }
      , setPrimaryPane('host', 'CHAT'));

    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
            moments: [],
            anchorMoments: [],
          },
          host: {
            id: '12345',
            name: 'host',
            moments: [],
            anchorMoments: [],
          },
        },
        panes: {
          primary: {
            type: 'CHAT',
            channelId: 'host',
          },
        },
      }
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
            moments: [],
            anchorMoments: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'public',
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
          user: currentUser,
          messageTrayOpen: false,
          closeTrayButtonRendered: false,
        },
      }
    );
    expect(result.channels.public.moments.length).toEqual(1);
    expect(result.channels.public.moments[0].text).toEqual('this is a message');
    expect(result.channels.public.moments[0].user.id).toEqual('12345');
    expect(result.channels.public.moments[0].user.name).toEqual('Joan Jet');
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
            moments: [],
            anchorMoments: [],
          },
          host: {
            id: '12345',
            name: 'public',
            moments: [],
            anchorMoments: [],
          },
        },
        panes: {
          primary: {
            type: 'CHAT',
            channelId: 'host',
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
          user: otherUser,
          messageTrayOpen: false,
          closeTrayButtonRendered: false,
        },
      }
    );
    expect(result.channels.public.moments.length).toEqual(0);
    expect(result.channels.host.moments.length).toEqual(1);
    expect(result.channels.host.moments[0].text).toEqual('this is a string');
    expect(result.channels.host.moments[0].user.pubnubToken).toEqual('12345');
    expect(result.channels.host.moments[0].user.name).toEqual('Billy Bob');
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
            moments: [],
            anchorMoments: [],
          },
          host: {
            id: '67890',
            name: 'host',
            moments: [],
            anchorMoments: [],
          },
        },
      },
      receiveMoment('host', {
        type: 'MESSAGE',
        id: '12345',
        text: 'Hello there',
        user: {
          id: '',
          name: '',
        },
        messageTrayOpen: false,
        closeTrayButtonRendered: false,
      })
    );
    expect(result.channels.public.moments.length).toEqual(0);
    expect(result.channels.host.moments.length).toEqual(1);
    expect(result.channels.host.moments[0].text).toEqual('Hello there');
    expect(result.channels.host.moments[0].id.length).toEqual(5);
  });

  test('adds a prayer request to host', () => {
    const action = () => {};
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
            moments: [],
            anchorMoments: [],
          },
          host: {
            id: '67890',
            name: 'host',
            moments: [],
            anchorMoments: [],
          },
        },
      },
      receiveMoment('host', {
        type: 'ACTIONABLE_NOTIFICATION',
        notificationType: 'PRAYER_REQUEST',
        id: '12345',
        user: otherUser,
        timeStamp: '4:53pm',
        active: true,
        action: action,
      })
    );
    expect(result.channels.host.moments.length).toEqual(1);
    expect(result.channels.host.moments[0].id.length).toEqual(5);
    expect(result.channels.host.moments[0].user.pubnubToken).toEqual('12345');
    expect(result.channels.host.moments[0].user.name).toEqual('Billy Bob');
    expect(result.channels.host.moments[0].timeStamp).toEqual('4:53pm');
    expect(result.channels.host.moments[0].active).toEqual(true);
    expect(result.channels.host.moments[0].action).toEqual(action);
  });

  test('add a channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [],
            anchorMoments: [],
          },
        },
      },
      addChannel('host', '12345')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [],
            anchorMoments: [],
          },
          '12345': {
            id: '12345',
            moments: [],
            anchorMoments: [],
            name: 'host',
            participants: undefined,
          },
        },
      },
    );
  });

  test('add a channel', () => {
    const result = reducer(
      {
        ...defaultState,
      },
      addChannel('direct', '12345', [otherUser])
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          '12345': {
            id: '12345',
            moments: [],
            anchorMoments: [],
            name: 'direct',
            participants: [
              otherUser,
            ],
          },
        },
      },
    );
  });

  test('add a channel that already exists', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          '12345': {
            id: '12345',
            name: 'host',
            moments: [],
            anchorMoments: [],
          },
        },
      }
      , addChannel('host', '12345'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          '12345': {
            id: '12345',
            name: 'host',
            moments: [],
            anchorMoments: [],
          },
        },
      }
    );
  });

  test('remove channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          other: {
            id: '12345',
            name: 'other',
            moments: [],
            anchorMoments: [],
          },
        },
      },
      removeChannel('other'));
    expect(result).toEqual(defaultState);
  });

  test('remove current channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          other: {
            id: '12345',
            name: 'other',
            moments: [],
            anchorMoments: [],
          },
        },
      },
      removeChannel('other')
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
                user: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
          },
        },
        currentUser: currentUser,
      },
      'public'
    );
    expect(result).toEqual(
      [
        {
          type: MESSAGE,
          id: '12345',
          text: 'I like socks',
          user: {
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
          },
          host: {
            id: '12345',
            name: 'host',
            moments: [
              {
                type: MESSAGE,
                id: '12345',
                text: 'I like socks',
                user: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
          },
        },
        currentUser: currentUser,
      },
      'host'
    );
    expect(result).toEqual(
      [
        {
          type: MESSAGE,
          id: '12345',
          text: 'I like socks',
          user: {
            id: '12345',
            name: 'Billy Bob',
          },
          messageTrayOpen: false,
        },
      ]
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
                user: {
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
          },
        },
        currentLanguage: 'ko',
        currentUser: currentUser,
      },
      'public'
    );
    expect(result).toEqual(
      [
        {
          type: MESSAGE,
          id: '12345',
          text: '나는 양말을 좋아한다.',
          user: {
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
          },
        },
      },
      'public'
    );
    expect(result).toEqual(
      [
        {
          id: '1234',
        },
        {
          id: '6789',
        },
      ]
    );
  });
  
  test('Accepts a user', () => {
    const result = reducer(defaultState, setUser(currentUser));
    expect(result).toEqual(
      {
        ...defaultState,
        currentUser: currentUser,
      }
    );
  });

  test('Opens only the correct message tray public channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: false,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                user: {
                  id: '12345',
                  name: 'William',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'public',
          },
        },
      },
      openMessageTray('123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                user: {
                  id: '12345',
                  name: 'William',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'public',
          },
        },
      }
    );
  });

  test('Opens only the correct message tray not public channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: false,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                user: {
                  id: '12345',
                  name: 'William',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
          },
        },
        panes: {
          primary: {
            type: 'CHAT',
            channelId: 'host',
          },
        },
      },
      openMessageTray('123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                user: {
                  id: '12345',
                  name: 'William',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
          },
        },
        panes: {
          primary: {
            type: 'CHAT',
            channelId: 'host',
          },
        },
      }
    );
  });

  test('Closes only the correct message tray public channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                closeTrayButtonRendered: true,
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                user: {
                  id: '12345',
                  name: 'William',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'public',
          },
        },
      },
      closeMessageTray('123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: false,
                closeTrayButtonRendered: true,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                user: {
                  id: '12345',
                  name: 'William',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'public',
          },
        },
      }
    );
  });

  test('Render closeTrayButton after the tray opens', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: true,
                closeTrayButtonRendered: false,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                user: {
                  id: '12345',
                  name: 'William',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'public',
          },
        },
      },
      toggleCloseTrayButton('123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: true,
                closeTrayButtonRendered: true,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                user: {
                  id: '12345',
                  name: 'William',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'public',
          },
        },
      }
    );
  });

  test('Render openTrayButton after the tray closes', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: false,
                closeTrayButtonRendered: true,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                user: {
                  id: '12345',
                  name: 'William',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'public',
          },
        },
      },
      toggleCloseTrayButton('123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: false,
                closeTrayButtonRendered: false,
              },
              {
                type: MESSAGE,
                id: '456',
                text: 'I like rocks',
                user: {
                  id: '12345',
                  name: 'William',
                },
                closeTrayButtonRendered: false,
                messageTrayOpen: false,
              },
            ],
            anchorMoments: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'public',
          },
        },
      }
    );
  });

  test('Can delete a message', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: MESSAGE,
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  name: 'Billy Bob',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '189',
                text: 'Hello Billy Bob',
                user: {
                  id: '14543',
                  name: 'Jenny Jane',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '204',
                text: 'George is very angry',
                user: {
                  id: '18475',
                  name: 'George Costanza',
                },
                messageTrayOpen: true,
              },
            ],
            anchorMoments: [],
          },
        },
      },
      deleteMessage('123', 'public')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: MESSAGE,
                id: '189',
                text: 'Hello Billy Bob',
                user: {
                  id: '14543',
                  name: 'Jenny Jane',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '204',
                text: 'George is very angry',
                user: {
                  id: '18475',
                  name: 'George Costanza',
                },
                messageTrayOpen: true,
              },
            ],
            anchorMoments: [],
          },
        },
      },
    );
  });

  test('Can publish a prayer notification', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            moments: [],
            anchorMoments: [],
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
          timeStamp: '4:53pm',
        },
      }
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            moments: [
              {
                type: 'NOTIFICATION',
                notificationType: 'PRAYER',
                id: '12345',
                host: 'Boofie',
                guest: 'Beefie',
                timeStamp: '4:53pm',
              },
            ],
            anchorMoments: [],
          },
        },
      }
    );
  });

  test('Can publish a joined chat notification public', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [],
            anchorMoments: [],
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
          timeStamp: '4:53pm',
        },
      }
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: 'NOTIFICATION',
                notificationType: 'JOINED_CHAT',
                id: '12345',
                name: 'Boofie',
                timeStamp: '4:53pm',
              },
            ],
            anchorMoments: [],
          },
        },
      }
    );
  });

  test('Can publish a joined chat notification host', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            moments: [],
            anchorMoments: [],
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
          timeStamp: '4:53pm',
        },
      }
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            moments: [
              {
                type: 'NOTIFICATION',
                notificationType: 'JOINED_CHAT',
                id: '12345',
                name: 'Boofie',
                timeStamp: '4:53pm',
              },
            ],
            anchorMoments: [],
          },
        },
      }
    );
  });

  test('Can publish a left chat notification public', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [],
            anchorMoments: [],
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
          timeStamp: '4:53pm',
        },
      }
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: 'NOTIFICATION',
                notificationType: 'LEFT_CHAT',
                id: '12345',
                name: 'Boofie',
                timeStamp: '4:53pm',
              },
            ],
            anchorMoments: [],
          },
        },
      }
    );
  });

  test('Can publish a left chat notification host', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          host: {

            id: '12345',
            name: 'host',
            moments: [],
            anchorMoments: [],
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
          timeStamp: '4:53pm',
        },
      }
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          host: {
            id: '12345',
            name: 'host',
            moments: [
              {
                type: 'NOTIFICATION',
                notificationType: 'LEFT_CHAT',
                id: '12345',
                name: 'Boofie',
                timeStamp: '4:53pm',
              },
            ],
            anchorMoments: [],
          },
        },
      }
    );
  });

  // TODO this won't go in event, but I don't know where else to put it right now
  test('Can publish an AvatarMoment in event channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [],
            anchorMoments: [],
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
          },
        },
      }
    );
  });

  test('Can publish a prayer request notification host', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            moments: [],
            anchorMoments: [],
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
          timeStamp: '4:53pm',
          active: true,
        },
      }
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          host: {
            id: '12345',
            name: 'host',
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: '12345',
                user: {
                  id: '5893',
                  name: 'Boofie',
                },
                timeStamp: '4:53pm',
                active: true,
              },
            ],
            anchorMoments: [],
          },
        },
      },
    );
  });

  test('Store anchorMoment from publishSalvation', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [],
            anchorMoments: [],
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
            moments: [],
            anchorMoments: [
              {
                type: 'ANCHOR_MOMENT',
                anchorMomentType: 'SALVATION',
                id: '12345',
                text: 'I commit my life to Christ.',
              },
            ],
          },
        },
      },
    );
  });

  test('Can publish an anchor moment as a moment and remove it from anchorMoment', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [],
            anchorMoments: [
              {
                type: 'ANCHOR_MOMENT',
                anchorMomentType: 'SALVATION',
                id: '12345',
                text: 'I commit my life to Christ.',
              },
            ],
          },
        },
      },
      releaseAnchorMoment('public', '12345')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: 'ANCHOR_MOMENT',
                anchorMomentType: 'SALVATION',
                id: '12345',
                text: 'I commit my life to Christ.',
              },
            ],
            anchorMoments: [],
          },
        },
      }
    );
  });

  test('Set salvations', () => {
    const result = reducer(
      {
        ...defaultState,
      },
      setSalvations(4),
    );
    expect(result).toEqual(
      {
        ...defaultState,
        salvations: 4,
      }
    );
  });

  test('Publish accepted prayer request', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ['12345']: {
            id: '12345',
            name: 'Host',
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: 'moment1',
                user: {
                  id: '67890',
                  name: 'Burglekutt',
                },
                timeStamp: '4:53pm',
                active: true,
                prayerChannel: '123456',
              },
            ],
            anchorMoments: [],
          },
        },
      },
      publishAcceptedPrayerRequest('123456', '12345')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ['12345']: {
            id: '12345',
            name: 'Host',
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: 'moment1',
                user: {
                  id: '67890',
                  name: 'Burglekutt',
                },
                timeStamp: '4:53pm',
                active: false,
                prayerChannel: '123456',
              },
            ],
            anchorMoments: [],
          },
        },
      },
    );
  });

  test('Receive accepted prayer request', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ['12345']: {
            id: '12345',
            name: 'Host',
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: 'moment1',
                user: {
                  id: '67890',
                  name: 'Burglekutt',
                },
                timeStamp: '4:53pm',
                active: true,
                prayerChannel: '123456',
              },
            ],
            anchorMoments: [],
          },
        },
      },
      receiveAcceptedPrayerRequest('123456', '12345')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ['12345']: {
            id: '12345',
            name: 'Host',
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: 'moment1',
                user: {
                  id: '67890',
                  name: 'Burglekutt',
                },
                timeStamp: '4:53pm',
                active: false,
                prayerChannel: '123456',
              },
            ],
            anchorMoments: [],
          },
        },
      },
    );
  });

  test('hasParticipants selector channel with participants', () => {
    const result = hasParticipantsSelector(
      {
        ...defaultState,
        channels: {
          direct: {
            id: '12345',
            name: 'Carl',
            moments: [],
            anchorMoments: [],
            participants: [
              otherUser,
              otherUser,
            ],
          },
        },
      },
      'direct'
    );
    expect(result).toEqual(true);
  });

  test('hasParticipants selector channel without participants', () => {
    const result = hasParticipantsSelector(
      {
        ...defaultState,
        channels: {
          direct: {
            id: '12345',
            name: 'Carl',
            moments: [],
            anchorMoments: [],
          },
        },
      },
      'direct'
    );
    expect(result).toEqual(false);
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
      'direct'
    );
    expect(result).toEqual(
      [otherUser]
    );
  });

  test('togglePopUpModal', () => {
    const result = reducer(
      {
        ...defaultState,
        isPopUpModalVisible: false,
      },
      togglePopUpModal()
    );
    expect(result).toEqual(
      {
        ...defaultState,
        isPopUpModalVisible: true,
      }
    );
  });

  test('leaveChannel', () => {
    const result = reducer(
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
          public: {
            id: '67890',
            name: 'Public',
            moments: [],
            anchorMoments: [],
            participants: [],
          },
        },
        panes: {
          primary: {
            type: 'CHAT',
            channelId: 'direct',
          },
        },
        currentUser: currentUser,
      },
      leaveChannel(currentUser.pubnubToken, 'direct')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          direct: {
            id: '12345',
            name: 'Carl',
            moments: [],
            anchorMoments: [],
            participants: [
              otherUser,
            ],
          },
          public: {
            id: '67890',
            name: 'Public',
            moments: [],
            anchorMoments: [],
            participants: [],
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'public',
          },
        },
        currentUser: currentUser,
      }
    );
  });
});

describe('Chat tests', () => {
  test('chat focus', () => {
    const result = reducer(
      {
        ...defaultState,
        isChatFocused: false,
        isVideoHidden: false,
      },
      {
        type: TOGGLE_CHAT_FOCUS,
        focus: true,
      });
    expect(result).toEqual(
      {
        ...defaultState,
        isChatFocused: true,
        isVideoHidden: true,
      }
    );

    const result2 = reducer(
      {
        ...defaultState,
        isChatFocused: true,
        isVideoHidden: true,
      },
      {
        type: TOGGLE_CHAT_FOCUS,
        focus: false,
      });
    expect(result2).toEqual(defaultState);
  });
});

describe('SideMenu tests', () => {
  test('Close sideMenu', () => {
    const results = reducer(
      {
        ...defaultState,
        isSideMenuClosed: false,
      },
      closeMenu()
    );
    expect(results).toEqual(
      {
        ...defaultState,
        isSideMenuClosed: true,
      }
    );
  });

  test('Close menu does not toggle when already true', () => {
    const results = reducer(
      {
        ...defaultState,
        isSideMenuClosed: true,
      },
      closeMenu()
    );
    expect(results).toEqual(
      {
        ...defaultState,
        isSideMenuClosed: true,
      }
    );
  });

  test('Open sideMenu', () => {
    const results = reducer(
      {
        ...defaultState,
        isSideMenuClosed: true,
      },
      openMenu()
    );
    expect(results).toEqual(
      {
        ...defaultState,
        isSideMenuClosed: false,
      }
    );
  });

  test('Open sideMenu does not toggle when already false', () => {
    const results = reducer(
      {
        ...defaultState,
        isSideMenuClosed: false,
      },
      openMenu()
    );
    expect(results).toEqual(
      {
        ...defaultState,
        isSideMenuClosed: false,
      }
    );
  });
});

describe('VideoFeed tests', () => {
  test('set url', () => {
    const result = reducer(
      defaultState,
      setVideo('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Standard')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        isVideoHidden: false,
        video: {
          ...defaultState.video,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          type: 'Standard',
        },
      }
    );
  });
});

describe('LanguageSelector tests', () => {
  test('SetLanguage Japanese', () => {
    const result = reducer(
      {
        ...defaultState,
        currentLanguage: 'en',
      },
      setLanguage('ko')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        currentLanguage: 'ko',
      }
    );
  });
});
