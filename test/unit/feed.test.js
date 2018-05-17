// @flow
import reducer, {
  changeChannel,
  addToChannel,
  addChannel,
  removeChannel,
  feedContents,
  updateOffset,
} from '../../src/feed/dux';

import {
  addToCurrentChannel,
  chatInput,
} from '../../src/chat/dux';

describe('Feed tests', () => {
  test('default state', () => {
    const result = reducer();
    expect(result).toEqual({
      channels: {
        default: {messages: [], offset: 0},
        host: {messages: [], offset: 0},
      },
      currentChannel: 'default',
      chatInput: '',
    });
  });

  test('change current channel', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [], offset: 0},
          host: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
      },
      changeChannel('host')
    );
    expect(result).toEqual({
      channels: {
        default: {messages: [], offset: 0},
        host: {messages: [], offset: 0},
      },
      currentChannel: 'host',
      chatInput: '',
    });
  });

  test('change current channel', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
      },
      changeChannel('host')
    );
    expect(result).toEqual({
      channels: {
        default: {messages: [], offset: 0},
      },
      currentChannel: 'default',
      chatInput: '',
    });
  });

  test('adds a message to current channel', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: 'this is a message',
      },
      addToCurrentChannel(),
    );
    expect(result.channels.default.messages.length).toEqual(1);
    expect(result.channels.default.offset).toEqual(0);
    expect(result.channels.default.messages[0].message).toEqual('this is a message');
    expect(result.channels.default.messages[0].id.length).toEqual(36);
  });

  test('adds a message to current channel not default', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [], offset: 0},
          host: {messages: [], offset: 0},
        },
        currentChannel: 'host',
        chatInput: 'this is a string',
      },
      addToCurrentChannel()
    );
    expect(result.channels.default.messages.length).toEqual(0);
    expect(result.channels.host.messages.length).toEqual(1);
    expect(result.channels.host.messages[0].message).toEqual('this is a string');
    expect(result.channels.host.messages[0].id.length).toEqual(36);
  });

  test('adds a message to not current channel', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [], offset: 0},
          host: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: 'this is a string',
      },
      addToChannel('host')
    );
    expect(result.channels.default.messages.length).toEqual(0);
    expect(result.channels.host.messages.length).toEqual(1);
    expect(result.channels.host.messages[0].message).toEqual('this is a string');
    expect(result.channels.host.messages[0].id.length).toEqual(36);
  });

  test('add a channel', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
      },
      addChannel('host')
    );
    expect(result).toEqual(
      {
        channels: {
          default: {messages: [], offset: 0},
          host: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
      }
    );
  });

  test('add a channel that already exsists', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [], offset: 0},
          host: {
            messages: [
              {
                id: '12345',
                message: 'I like socks',
                neverRendered: true,
              },
            ],
            offset:0,
          },
        },
        currentChannel: 'default',
        chatInput: '',
      },
      addChannel('host')
    );
    expect(result).toEqual(
      {
        channels: {
          default: {messages: [], offset: 0},
          host: {
            messages: [
              {
                id: '12345',
                message: 'I like socks',
                neverRendered: true,
              },
            ],
            offset: 0,
          },
        },
        currentChannel: 'default',
        chatInput: '',
      }
    );
  });

  test('remove channel', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [], offset: 0},
          host: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
      },
      removeChannel('host')
    );
    expect(result).toEqual(
      {
        channels: {
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
      }
    );
  });

  test('remove default', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
      },
      removeChannel('default')
    );
    expect(result).toEqual(
      {
        channels: {
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
      }
    );
  });

  test('remove current channel', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [], offset: 0},
          host: {messages: [], offset: 0},
        },
        currentChannel: 'host',
        chatInput: '',
      },
      removeChannel('host')
    );
    expect(result).toEqual(
      {
        channels: {
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
      }
    );
  });

  test('Feed contents', () => {
    const result = feedContents(
      {
        channels: {
          default: {
            messages: [
              {
                id: '12345',
                message: 'I like socks',
                neverRendered: true,
              },
            ],
            offset: 0,
          },
        },
        currentChannel: 'default',
        chatInput: '',
      }
    );
    expect(result).toEqual(
      [
        {
          id: '12345',
          message: 'I like socks',
          neverRendered: true,
        },
      ],
    );
  });

  test('Feed contents not default', () => {
    const result = feedContents(
      {
        channels: {
          default: {messages: [], offset: 0},
          host: {
            messages: [
              {
                id: '12345',
                message: 'I like socks',
                neverRendered: true,
              },
            ],
            offset: 0,
          },
        },
        currentChannel: 'host',
        chatInput: '',
      }
    );
    expect(result).toEqual(
      [
        {
          id: '12345',
          message: 'I like socks',
          neverRendered: true,
        },
      ]
    );
  });

  test('Feed listens to message input', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
      },
      chatInput('Hello'),
    );
    expect(result).toEqual(
      {
        channels: {
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: 'Hello',
      }
    );
  });

  test('Feed update offset', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [
            {
              id: '12345',
              message: 'Hello',
              neverRendered: true,
            },
          ], offset: -50},
        },
        currentChannel: 'default',
        chatInput: '',
      },
      updateOffset(-50, '12345'),
    );
    expect(result).toEqual(
      {
        channels: {
          default: {messages: [
            {
              id: '12345',
              message: 'Hello',
              neverRendered: false,
            },
          ], offset: -100},
        },
        currentChannel: 'default',
        chatInput: '',
      }
    );
  });
});
