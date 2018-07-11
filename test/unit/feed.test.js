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
} from '../../src/moment';

import { MESSAGE } from '../../src/moment/dux';

import {
  addToCurrentChannel,
  chatInput,
} from '../../src/chat/dux';

import { setUser } from '../../src/io/chat/dux';

describe('Feed tests', () => {
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
          public: { moments: [] },
          host:{ moments: [] },
        },
        currentChannel: 'pubic',
      }
      , changeChannel('host'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: { moments:[] },
          host: { moments:[] },
        },
        currentChannel: 'host',
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
          public: { moments: [] },
        },
        currentChannel: 'public',
        chatInput: 'this is a message',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        },
      },
      addToCurrentChannel(),
    );
    expect(result.channels.public.moments.length).toEqual(1);
    expect(result.channels.public.moments[0].text).toEqual('this is a message');
    expect(result.channels.public.moments[0].user.id).toEqual('12345');
    expect(result.channels.public.moments[0].user.nickname).toEqual('Billy Bob');
    expect(result.channels.public.moments[0].id.length).toEqual(36);
    expect(result.appendingMessage).toBe(true);
  });

  test('adds a message to not current channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: { moments: [] },
          host: { moments: [] },
        },
        currentChannel: 'public',
        chatInput: 'this is a string',
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
    expect(result.channels.public.moments.length).toEqual(0);
    expect(result.channels.host.moments.length).toEqual(1);
    expect(result.channels.host.moments[0].text).toEqual('Hello there');
    expect(result.channels.host.moments[0].id.length).toEqual(5);
    expect(result.appendingMessage).toBe(false);
  });

  test('add a channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          public: { moments: [] },
        },
      },
      addChannel('host', '12345')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          public: { moments: [] },
          host: { moments: [] },
        },
      },
    );
  });

  test('add a channel', () => {
    const result = reducer(
      {
        ...defaultState,
      },
      addChannel('direct', '12345', [{id: '12345', nickname: 'Bobby G.'}])
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          direct: {
            moments: [],
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
          public: { moments: [] },
        },
      }
      , addChannel('public', '12345'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          public: { moments: [] },
        },
      }
    );
  });

  test('remove channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          ...defaultState.channels,
          other: { moments: [] },
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
          other: { moments: [] },
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
          public: { moments: [] },
          host: {
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
          public: {
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
});
