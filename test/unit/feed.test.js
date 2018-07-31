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
  getParticipantsBool,
} from '../../src/feed/dux';

import {
  openMessageTray,
  closeMessageTray,
  deleteMessage,
  toggleCloseTrayButton,
} from '../../src/moment';

import { publishAcceptedPrayerRequest } from '../../src/moment/actionableNotification/dux';

import { MESSAGE } from '../../src/moment/dux';

import {
  addToCurrentChannel,
  chatInput,
} from '../../src/chat/dux';

import { setUser } from '../../src/io/chat/dux';

import {
  releaseAnchorMoment,
  SET_ANCHOR_MOMENT,
} from '../../src/placeholder/anchorMoment/dux';

import { mockDate } from '../testUtils';

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

  test('does not add message if chatInput is empty', () => {
    const result = reducer(defaultState, addToCurrentChannel());
    expect(result).toEqual(defaultState);
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
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        },
        animatingMoment: false,
      },
      addToCurrentChannel(),
    );
    expect(result.channels.public.moments.length).toEqual(1);
    expect(result.channels.public.moments[0].text).toEqual('this is a message');
    expect(result.channels.public.moments[0].user.id).toEqual('12345');
    expect(result.channels.public.moments[0].user.nickname).toEqual('Billy Bob');
    expect(result.channels.public.moments[0].id.length).toEqual(36);
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
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        },
      },
      addToCurrentChannel()
    );
    expect(result.channels.public.moments.length).toEqual(0);
    expect(result.channels.host.moments.length).toEqual(1);
    expect(result.channels.host.moments[0].text).toEqual('this is a string');
    expect(result.channels.host.moments[0].user.id).toEqual('12345');
    expect(result.channels.host.moments[0].user.nickname).toEqual('Billy Bob');
    expect(result.channels.host.moments[0].id.length).toEqual(36);
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
        chatInput: 'this is a string',
        animatingMoment: false,
        appeningMessage: true,
      },
      receiveMoment('host', {
        type: MESSAGE,
        id: '12345',
        text: 'Hello there',
        neverRendered: true,
        user: {
          id: '',
          nickname: '',
        },
        messageTrayOpen: false,
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
        user: {
          id: '12345',
          nickname: 'Herbert',
        },
        timeStamp: '4:53pm',
        active: true,
        action: action,
      })
    );
    expect(result.channels.host.moments.length).toEqual(1);
    expect(result.channels.host.moments[0].id.length).toEqual(5);
    expect(result.channels.host.moments[0].user.id).toEqual('12345');
    expect(result.channels.host.moments[0].user.nickname).toEqual('Herbert');
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
      addChannel('direct', '12345', [{ id: '12345', nickname: 'Bobby G.' }])
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
              {
                id: '12345',
                nickname: 'Bobby G.',
              },
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
                    nickname: 'Billy Bob',
                  },
                  messageTrayOpen: false,
                },
              ],
          },
        },
        currentChannel: 'public',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        },
      }
    );
    expect(result).toEqual(
      [
        {
          id: '12345',
          text: 'I like socks',
          user: {
            id: '12345',
            nickname: 'Billy Bob',
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
                    nickname: 'Billy Bob',
                  },
                  messageTrayOpen: false,
                },
              ],
          },
        },
        currentChannel: 'host',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        },
      }
    );
    expect(result).toEqual(
      [
        {
          id: '12345',
          text: 'I like socks',
          user: {
            id: '12345',
            nickname: 'Billy Bob',
          },
          messageTrayOpen: false,
        },
      ]
    );
  });

  test('feedContents works without a channel', () => {
    expect(feedContents(defaultState)).toEqual([]);
  });

  test('Feed listens to message input', () => {
    const result = reducer(defaultState, chatInput('Hello'));
    expect(result).toEqual(
      {
        ...defaultState,
        chatInput: 'Hello',
      }
    );
  });

  test('Accepts a user', () => {
    const result = reducer(defaultState, setUser('12345', 'Billy Bob'));
    expect(result).toEqual(
      {
        ...defaultState,
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        },
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
                  nickname: 'Billy Bob',
                },
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
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  nickname: 'Billy Bob',
                },
                messageTrayOpen: true,
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
                  nickname: 'Billy Bob',
                },
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
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  nickname: 'Billy Bob',
                },
                messageTrayOpen: true,
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
                  nickname: 'Billy Bob',
                },
                messageTrayOpen: true,
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
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  nickname: 'Billy Bob',
                },
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
                  nickname: 'Billy Bob',
                },
                messageTrayOpen: true,
                closeTrayButtonRendered: false,
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
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  nickname: 'Billy Bob',
                },
                messageTrayOpen: true,
                closeTrayButtonRendered: true,
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
                  nickname: 'Billy Bob',
                },
                messageTrayOpen: false,
                closeTrayButtonRendered: true,
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
                id: '123',
                text: 'I like socks',
                user: {
                  id: '12345',
                  nickname: 'Billy Bob',
                },
                messageTrayOpen: false,
                closeTrayButtonRendered: false,
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
                  nickname: 'Billy Bob',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '189',
                text: 'Hello Billy Bob',
                user: {
                  id: '14543',
                  nickname: 'Jenny Jane',
                },
                messageTrayOpen: true,
              },
              {
                type: MESSAGE,
                id: '204',
                text: 'George is very angry',
                user: {
                  id: '18475',
                  nickname: 'George Costanza',
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
          public:
            [
              {
                id: '189',
                text: 'Hello Billy Bob',
                user: {
                  id: '14543',
                  nickname: 'Jenny Jane',
                },
                messageTrayOpen: true,
              },
              {
                id: '204',
                text: 'George is very angry',
                user: {
                  id: '18475',
                  nickname: 'George Costanza',
                },
                messageTrayOpen: true,
              },
            ],
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
            nickname: 'Madmartigan',
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
                  nickname: 'Madmartigan',
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
            nickname: 'Boofie',
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
                  nickname: 'Boofie',
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
      defaultState,
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
        placeholderPresent: true,
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
        placeholderPresent: true,
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
        placeholderPresent: false,
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
                  nickname: 'Burglekutt',
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
                  nickname: 'Burglekutt',
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
                  nickname: 'Burglekutt',
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
                  nickname: 'Burglekutt',
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
        currentUser: {
          id: '67890',
          nickname: 'Booffie',
        },
      },
      inviteToChannel(
        {
          id: '32454',
          nickname: 'Billy',
        },
        '12345')
    );
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
                id: '67890',
                nickname: 'Booffie',
              },
              {
                id: '32454',
                nickname: 'Billy',
              },
            ],
          },
        },
        currentUser: {
          id: '67890',
          nickname: 'Booffie',
        },
      },
    );
  });

  test('hasParticipants', () => {
    const result = getParticipantsBool(
      {
        ...defaultState,
        channels: {
          direct: {
            id: '12345',
            name: 'Carl',
            moments: [],
            participants: [
              {
                id: '12345',
                nickname: 'Bootbot',
              },
              {
                id: '54321',
                nickname: 'Sockrock',
              },
            ],
          },
          currentChannel: 'direct',
        },
      }
    );
    expect(result).toEqual(true);
  });
});
