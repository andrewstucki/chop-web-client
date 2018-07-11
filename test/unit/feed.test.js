// @flow
import reducer, {
  changeChannel,
  receiveMessage,
  addChannel,
  removeChannel,
  feedContents,
  defaultState,
  appendMessage,
} from '../../src/feed/dux';

import {
  openMessageTray,
  closeMessageTray,
  deleteMessage,
  toggleCloseTrayButton,
} from '../../src/moment';

import { MESSAGE } from '../../src/moment/dux';

import {
  publishPrayerNotification,
  publishJoinedChatNotification,
  publishLeftChatNotification,
} from '../../src/moment/notification/dux';

import {
  publishPrayerRequestNotification,
  acceptPrayerRequest,
} from '../../src/moment/actionableNotification/dux';

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
    const result = reducer(defaultState, changeChannel('host'));
    expect(result).toEqual(
      {
        ...defaultState,
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
        chatInput: 'this is a message',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        },
        renderingAnchorMoment: true,
      },
      addToCurrentChannel(),
    );
    expect(result.channels.public.length).toEqual(1);
    expect(result.channels.public[0].text).toEqual('this is a message');
    expect(result.channels.public[0].user.id).toEqual('12345');
    expect(result.channels.public[0].user.nickname).toEqual('Billy Bob');
    expect(result.channels.public[0].id.length).toEqual(36);
    expect(result.appendingMessage).toBe(true);
    expect(result.renderingAnchorMoment).toBe(false);
  });

  test('adds a message to current channel not public from current user', () => {
    const result = reducer(
      {
        ...defaultState,
        currentChannel: 'host',
        chatInput: 'this is a string',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        },
      },
      addToCurrentChannel()
    );
    expect(result.channels.public.length).toEqual(0);
    expect(result.channels.host.length).toEqual(1);
    expect(result.channels.host[0].text).toEqual('this is a string');
    expect(result.channels.host[0].user.id).toEqual('12345');
    expect(result.channels.host[0].user.nickname).toEqual('Billy Bob');
    expect(result.channels.host[0].id.length).toEqual(36);
    expect(result.appendingMessage).toBe(true);
  });

  test('adds a message to not current channel', () => {
    const result = reducer(
      {
        ...defaultState,
        currentChannel: 'public',
        chatInput: 'this is a string',
        renderingAnchorMoment: true,
      },
      receiveMessage('host', {
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
    expect(result.channels.public.length).toEqual(0);
    expect(result.channels.host.length).toEqual(1);
    expect(result.channels.host[0].text).toEqual('Hello there');
    expect(result.channels.host[0].id.length).toEqual(5);
    expect(result.appendingMessage).toBe(false);
    expect(result.renderingAnchorMoment).toBe(false);
  });

  test('add a channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: [],
        },
      },
      addChannel('host')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: [],
          host: [],
        },
      },
    );
  });

  test('add a channel that already exists', () => {
    const result = reducer(defaultState, addChannel('host'));
    expect(result).toEqual(defaultState);
  });

  test('remove channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: [],
          host: [],
          other: [],
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
          public: [],
        },
      },
      removeChannel('public')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: [],
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
          other: [],
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
          public: 
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
          public: [],
          host: 
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
          public: 
          [
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
      openMessageTray('123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: 
          [
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
      }
    );
  });

  test('Opens only the correct message tray not public channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          host: 
          [
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
        currentChannel: 'host',
      },
      openMessageTray('123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          host: 
          [
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
        currentChannel: 'host',
      }
    );
  });

  test('Closes only the correct message tray public channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: 
          [
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
      closeMessageTray('123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: 
          [
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
      }
    );
  });

  test('Render closeTrayButton after the tray opens', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: 
          [
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
      toggleCloseTrayButton('123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: 
          [
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
      }
    );
  });

  test('Render openTrayButton after the tray closes', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: 
          [
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
      toggleCloseTrayButton('123'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: 
          [
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
      }
    );
  });

  test('Can delete a message', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: 
          [
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
      },
    );
  });

  test('Can publish a prayer notification', () => {
    const result = reducer(
      defaultState,
      publishPrayerNotification('Boofie', 'Beefie')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          host: [
            ...defaultState.channels.host,
            {
              type: 'NOTIFICATION',
              notificationType: 'PRAYER',
              host: 'Boofie',
              guest: 'Beefie',
              timeStamp: '4:53pm',
            },
          ],
        },
      }
    );
  });

  test('Can publish a joined chat notification public', () => {
    const result = reducer(
      defaultState,
      publishJoinedChatNotification('Boofie', 'public')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: [
            ...defaultState.channels.public,
            {
              type: 'NOTIFICATION',
              notificationType: 'JOINED_CHAT',
              name: 'Boofie',
              timeStamp: '4:53pm',
            },
          ],
        },
      }
    );
  });

  test('Can publish a joined chat notification host', () => {
    const result = reducer(
      defaultState,
      publishJoinedChatNotification('Boofie', 'host')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          host: [
            ...defaultState.channels.host,
            {
              type: 'NOTIFICATION',
              notificationType: 'JOINED_CHAT',
              name: 'Boofie',
              timeStamp: '4:53pm',
            },
          ],
        },
      }
    );
  });

  test('Can publish a left chat notification public', () => {
    const result = reducer(
      defaultState,
      publishLeftChatNotification('Boofie', 'public')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: [
            ...defaultState.channels.public,
            {
              type: 'NOTIFICATION',
              notificationType: 'LEFT_CHAT',
              name: 'Boofie',
              timeStamp: '4:53pm',
            },
          ],
        },
      }
    );
  });

  test('Can publish a left chat notification host', () => {
    const result = reducer(
      defaultState,
      publishLeftChatNotification('Boofie', 'host')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          host: [
            ...defaultState.channels.host,
            {
              type: 'NOTIFICATION',
              notificationType: 'LEFT_CHAT',
              name: 'Boofie',
              timeStamp: '4:53pm',
            },
          ],
        },
      }
    );
  });

  test('Can publish a prayer request notification host', () => {
    const result = reducer(
      defaultState,
      publishPrayerRequestNotification('Boofie', true)
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          host: [
            ...defaultState.channels.host,
            {
              type: 'ACTIONABLE_NOTIFICATION',
              notificationType: 'PRAYER_REQUEST',
              name: 'Boofie',
              timeStamp: '4:53pm',
              active: true,
              action: acceptPrayerRequest,
            },
          ],
        },
      }
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
          anchorMomentAnchored: true,
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
          anchorMomentAnchored: true,
        },
        placeholderPresent: true,
      }
    );
  });

  test('Can publish an anchor moment as a moment and remove it from anchorMoment', () => {
    const result = reducer(
      {
        ...defaultState,
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
          anchorMomentAnchored: true,
        },
        renderingAnchorMoment: false,
        placeholderPresent: true,
      },
      releaseAnchorMoment()
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          host: [
            ...defaultState.channels.host,
            {
              type: 'ANCHOR_MOMENT',
              id: '12345',
              text: 'I commit my life to Christ.',
              subText: '1 hand raised',
              anchorMomentAnchored: false,
            },
          ],
        },
        renderingAnchorMoment: true,
        placeholderPresent: false,
      }
    );
  });
});
