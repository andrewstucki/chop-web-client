// @flow
import reducer, {
  changeChannel,
  receiveMoment,
  addChannel,
  removeChannel,
  feedContents,
  defaultState,
  appendMessage,
  inviteToChannel,
  receiveAcceptedPrayerRequest,
  hasParticipants,
  getOtherUser,
  togglePopUpModal,
  leaveChat,
  setInitData,
  setUser,
} from '../../src/feed/dux';

import {
  closeMenu, 
  openMenu,
} from '../../src/sideMenu/dux';

import { setVideoUrl } from '../../src/videoFeed/dux';

import { TOGGLE_CHAT_FOCUS } from '../../src/chat/dux';

import {
  openMessageTray,
  closeMessageTray,
  deleteMessage,
  toggleCloseTrayButton,
  publishAcceptedPrayerRequest,
  MESSAGE,
} from '../../src/moment';

import {
  releaseAnchorMoment,
  publishSalvation,
  SET_ANCHOR_MOMENT,
} from '../../src/placeholder/anchorMoment/dux';

import { mockDate } from '../testUtils';

import { setLanguage } from '../../src/languageSelector/dux';

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
          },
          host: {
            id: '12345',
            name: 'host',
            moments: [],
          },
        },
        currentChannel: 'pubic',
      }
      , changeChannel('host'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
            moments: [],
          },
          host: {
            id: '12345',
            name: 'host',
            moments: [],
          },
        },
        currentChannel: 'host',
        appendingMessage: false,
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
          },
        },
        currentChannel: 'public',
        chatInput: 'this is a message',
        currentUser: currentUser,
        animatingMoment: false,
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
    expect(result.appendingMessage).toBe(true);
    expect(result.animatingMoment).toBe(true);
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
          },
          host: {
            id: '12345',
            name: 'public',
            moments: [],
          },
        },
        currentChannel: 'host',
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
    expect(result.appendingMessage).toBe(true);
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
          },
          host: {
            id: '67890',
            name: 'host',
            moments: [],
          },
        },
        currentChannel: 'public',
        animatingMoment: false,
        appeningMessage: true,
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
    expect(result.appendingMessage).toBe(false);
    expect(result.animatingMoment).toBe(true);
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
          },
          host: {
            id: '67890',
            name: 'host',
            moments: [],
          },
        },
        currentChannel: 'public',
        animatingMoment: false,
        appendingMessage: true,
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
    expect(result.appendingMessage).toBe(false);
    expect(result.animatingMoment).toBe(true);
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
          },
          host: {
            id: '12345',
            moments: [],
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
          direct: {
            id: '12345',
            moments: [],
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
          host: {
            id: '12345',
            name: 'host',
            moments: [],
          },
        },
      }
      , addChannel('host', '12345'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          host: {
            id: '12345',
            name: 'host',
            moments: [],
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
          },
        },
      },
      removeChannel('other'));
    expect(result).toEqual(defaultState);
  });


  test('remove public', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [],
          },
        },
      },
      removeChannel('public')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: {
            id: '12345',
            name: 'public',
            moments: [],
          },
        },
      },
    );
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
          },
        },
        currentChannel: 'other',
      },
      removeChannel('other')
    );
    expect(result).toEqual(defaultState);
  });

  test('Feed contents', () => {
    const result = feedContents(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments:
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
          },
        },
        currentChannel: 'public',
        currentUser: currentUser,
      }
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
    const result = feedContents(
      {
        ...defaultState,
        channels: {
          public: { 
            id: '12345',
            name: 'public',
            moments: [],
          },
          host: {
            id: '12345',
            name: 'host',
            moments:
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
          },
        },
        currentChannel: 'host',
        currentUser: currentUser,
      }
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

  test('feedContents works without a channel', () => {
    expect(feedContents(defaultState)).toEqual([]);
  });

  test('feedContents returns translations', () => {
    const result = feedContents(
      {
        ...defaultState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments:
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
          },
        },
        currentLanguage: 'ko',
        currentChannel: 'public',
        currentUser: currentUser,
      }
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

  test('Accepts a user', () => {
    const result = reducer(defaultState, setUser(currentUser));
    expect(result).toEqual(
      {
        ...defaultState,
        currentUser: currentUser,
      }
    );
  });

  test('Appends a message', () => {
    const result = appendMessage({
      ...defaultState,
      appendingMessage: true,
    });
    expect(result).toEqual(true);
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
          },
        },
        currentChannel: 'public',
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
          },
        },
        currentChannel: 'public',
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
          },
        },
        currentChannel: 'host',
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
          },
        },
        currentChannel: 'host',
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
          },
        },
        currentChannel: 'public',
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
          },
        },
        currentChannel: 'public',
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
          },
        },
        currentChannel: 'public',
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
          },
        },
        currentChannel: 'public',
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
          },
        },
        currentChannel: 'public',
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
          },
        },
        currentChannel: 'public',
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
          },
        },
        currentChannel: 'public',
      },
      deleteMessage('123')
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
          },
        },
        currentChannel: 'public',
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
          },
        },
        currentChannel: 'host',
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
          },
        },
        currentChannel: 'host',
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
          },
        },
        currentChannel: 'public',
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
        animatingMoment: true,
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
          },
        },
        currentChannel: 'public',
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
          },
        },
        currentChannel: 'host',
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
        animatingMoment: true,
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
          },
        },
        currentChannel: 'host',
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
          },
        },
        currentChannel: 'public',
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
        animatingMoment: true,
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
          },
        },
        currentChannel: 'public',
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
          },
        },
        currentChannel: 'host',
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
        animatingMoment: true,
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
          },
        },
        currentChannel: 'host',
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
          },
        },
        currentChannel: 'public',
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
        animatingMoment: true,
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
          },
        },
        currentChannel: 'public',
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
          },
        },
        currentChannel: 'host',
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
        animatingMoment: true,
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
          },
        },
        currentChannel: 'host',
      },
    );
  });

  test('Store anchorMoment from publishSalvation', () => {
    const result = reducer(
      {
        ...defaultState,
        isPlaceholderPresent: false,
      },
      {
        type: SET_ANCHOR_MOMENT,
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
        },
      },
    );
    expect(result).toEqual(
      {
        ...defaultState,
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
        },
        isPlaceholderPresent: true,
      }
    );
  });

  test('Can publish an anchor moment as a moment and remove it from anchorMoment', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            moments: [],
          },
        },
        currentChannel: 'host',
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
        },
        animatingMoment: true,
        isPlaceholderPresent: true,
      },
      releaseAnchorMoment()
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
                type: 'ANCHOR_MOMENT',
                id: '12345',
                text: 'I commit my life to Christ.',
                subText: '1 hand raised',
              },
            ],
          },
        },
        animatingMoment: false,
        isPlaceholderPresent: false,
        currentChannel: 'host',
      }
    );
  });

  test('Publish accepted prayer request', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          host: {
            id: '12345',
            name: 'host',
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: '12345',
                user: {
                  id: '67890',
                  name: 'Burglekutt',
                },
                timeStamp: '4:53pm',
                active: true,
              },
            ],
          },
        },
      },
      publishAcceptedPrayerRequest('12345')
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
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: '12345',
                user: {
                  id: '67890',
                  name: 'Burglekutt',
                },
                timeStamp: '4:53pm',
                active: false,
              },
            ],
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
          host: {
            id: '12345',
            name: 'host',
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: '12345',
                user: {
                  id: '67890',
                  name: 'Burglekutt',
                },
                timeStamp: '4:53pm',
                active: true,
              },
            ],
          },
        },
      },
      receiveAcceptedPrayerRequest('12345')
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
                type: 'ACTIONABLE_NOTIFICATION',
                notificationType: 'PRAYER_REQUEST',
                id: '12345',
                user: {
                  id: '67890',
                  name: 'Burglekutt',
                },
                timeStamp: '4:53pm',
                active: false,
              },
            ],
          },
        },
      },
    );
  });

  test('Invite to channel', () => {
    const result = reducer(
      {
        ...defaultState,
        currentUser: currentUser,
      },
      inviteToChannel(otherUser, '12345'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ['12345']: {
            id: '12345',
            name: '12345',
            moments: [],
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
    );
  });

  test('hasParticipants channel with participants', () => {
    const result = hasParticipants(
      {
        ...defaultState,
        channels: {
          direct: {
            id: '12345',
            name: 'Carl',
            moments: [],
            participants: [
              otherUser,
              otherUser,
            ],
          },
        },
        currentChannel: 'direct',
      }
    );
    expect(result).toEqual(true);
  });

  test('hasParticipants channel without participants', () => {
    const result = hasParticipants(
      {
        ...defaultState,
        channels: {
          direct: {
            id: '12345',
            name: 'Carl',
            moments: [],
          },
        },
        currentChannel: 'direct',
      }
    );
    expect(result).toEqual(false);
  });

  test('getOtherUser', () => {
    const result = getOtherUser(
      {
        ...defaultState,
        channels: {
          direct: {
            id: '12345',
            name: 'Carl',
            moments: [],
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
        currentChannel: 'direct',
        currentUser: currentUser,
      }
    );
    expect(result).toEqual(
      otherUser
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

  test('leaveChat', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          direct: {
            id: '12345',
            name: 'Carl',
            moments: [],
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
        currentChannel: 'direct',
        currentUser: currentUser,
      },
      leaveChat(
        {
          pubnubToken: currentUser.pubnubToken,
          name: currentUser.name,
          role: {
            label: currentUser.role.label,
          },
        }
      )
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          direct: {
            id: '12345',
            name: 'Carl',
            moments: [],
            participants: [
              otherUser,
            ],
          },
        },
        currentChannel: 'direct',
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

describe('Placeholder tests', () => {
  test('Publish salvation anchorMoment 1 hand raised', () => {
    const result = reducer(defaultState, publishSalvation(1));
    expect(result.anchorMoment ? result.anchorMoment.subText : '')
      .toEqual('1 hand raised');
  });

  test('Publish salvation anchorMoment multiple hands raised', () => {
    const result = reducer(defaultState, publishSalvation(4));
    expect(result.anchorMoment ? result.anchorMoment.subText : '')
      .toBe('4 hands raised');
  });

  test('Sets salvation anchor moment', () => {
    const result = reducer(
      defaultState,
      {
        type: 'SET_ANCHOR_MOMENT',
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
        },
      }
    );
    expect(result.isPlaceholderPresent).toBe(true);
    expect(result.anchorMoment).toEqual(
      {
        type: 'ANCHOR_MOMENT',
        id: '12345',
        text: 'I commit my life to Christ.',
        subText: '1 hand raised',
      }
    );
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
      setVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        isVideoHidden: false,
        video: {
          ...defaultState.video,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      }
    );
  });
});

describe('Initial State', () => {
  test('Set Initial State', () => {
    expect(reducer(
      defaultState,
      setInitData(
        {
          event: {
            startTime: 1531864800,
            id: 334494,
            timezone: 'America/Chicago',
            title: 'Fake Event',
          },
          video: {
            type: 'StandardEmbed',
            url: 'https://www.youtube.com/embed/bz2kN31m_S0',
          },
          channels: {
            '123456': {
              id: '123456',
              name: 'public',
              users: null,
              moments: [],
            },
            '654321': {
              id: '654321',
              name: 'host',
              users: null,
              moments: [],
            },
          },
          user: {
            avatar: null,
            id: '123456',
            name: 'Pebbles FlintStone',
            pubnubAccessKey: '123456',
            pubnubToken: '1533956431068',
            role: {
              label: 'HOST',
              permissions: [
                'all-the-things',
              ],
            },
          },
          pubnubKeys: {
            publish: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
            subscribe: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
          },
          organization: {
            id: 2,
            name: 'Life.Church',
          },
          currentChannel: '123456',
          languageOptions: [
            {
              name: 'English',
              code: 'ok',
            },
            {
              name: 'Korean',
              code: 'ko',
            },
          ],
        }
      )
    )).toEqual(
      {
        ...defaultState,
        event: {
          startTime: 1531864800,
          id: 334494,
          timezone: 'America/Chicago',
          title: 'Fake Event',
        },
        video: {
          type: 'StandardEmbed',
          url: 'https://www.youtube.com/embed/bz2kN31m_S0',
        },
        channels: {
          '123456': {
            id: '123456',
            name: 'public',
            users: null,
            moments: [],
          },
          '654321': {
            id: '654321',
            name: 'host',
            users: null,
            moments: [],
          },
        },
        currentUser: {
          avatar: null,
          id: '123456',
          name: 'Pebbles FlintStone',
          pubnubAccessKey: '123456',
          pubnubToken: '1533956431068',
          role: {
            label: 'HOST',
            permissions: [
              'all-the-things',
            ],
          },
        },
        pubnubKeys: {
          publish: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
          subscribe: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
        },
        organization: {
          id: 2,
          name: 'Life.Church',
        },
        currentChannel: '123456',
        languageOptions: [
          {
            name: 'English',
            code: 'ok',
          },
          {
            name: 'Korean',
            code: 'ko',
          },
        ],
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
