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
        default: [],
        host: [],
      },
      currentChannel: 'default',
      offset: 0,
      chatInput: '',
    });
  });

  test('change current channel', () => {
    const result = reducer(
      {
        channels: {
          default: [],
          host: [],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: '',
      },
      changeChannel('host')
    );
    expect(result).toEqual({
      channels: {
        default: [],
        host: [],
      },
      currentChannel: 'host',
      offset: 0,
      chatInput: '',
    });
  });

  test('change current channel', () => {
    const result = reducer(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: '',
      },
      changeChannel('host')
    );
    expect(result).toEqual({
      channels: {
        default: [],
      },
      currentChannel: 'default',
      offset: 0,
      chatInput: '',
    });
  });

  test('adds a message to current channel', () => {
    const result = reducer(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: 'this is a message',
      },
      addToCurrentChannel(),
    );
    expect(result.channels.default.length).toEqual(1);
    expect(result.channels.default[0].message).toEqual('this is a message');
    expect(result.channels.default[0].id.length).toEqual(36);
  });

  test('adds a message to current channel not default', () => {
    const result = reducer(
      {
        channels: {
          default: [],
          host: [],
        },
        currentChannel: 'host',
        offset: 0,
        chatInput: 'this is a string',
      },
      addToCurrentChannel()
    );
    expect(result.channels.default.length).toEqual(0);
    expect(result.channels.host.length).toEqual(1);
    expect(result.channels.host[0].message).toEqual('this is a string');
    expect(result.channels.host[0].id.length).toEqual(36);
  });

  test('adds a message to not current channel', () => {
    const result = reducer(
      {
        channels: {
          default: [],
          host: [],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: 'this is a string',
      },
      addToChannel('host')
    );
    expect(result.channels.default.length).toEqual(0);
    expect(result.channels.host.length).toEqual(1);
    expect(result.channels.host[0].message).toEqual('this is a string');
    expect(result.channels.host[0].id.length).toEqual(36);
  });

  test('add a channel', () => {
    const result = reducer(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: '',
      },
      addChannel('host')
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
          host: [],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: '',
      }
    );
  });

  test('add a channel that already exsists', () => {
    const result = reducer(
      {
        channels: {
          default: [],
          host: [
            {
              id: '12345',
              message: 'I like socks',
            },
          ],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: '',
      },
      addChannel('host')
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
          host: [
            {
              id: '12345',
              message: 'I like socks',
            },
          ],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: '',
      }
    );
  });

  test('remove channel', () => {
    const result = reducer(
      {
        channels: {
          default: [],
          host: [],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: '',
      },
      removeChannel('host')
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: '',
      }
    );
  });

  test('remove default', () => {
    const result = reducer(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: '',
      },
      removeChannel('default')
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: '',
      }
    );
  });

  test('remove current channel', () => {
    const result = reducer(
      {
        channels: {
          default: [],
          host: [],
        },
        currentChannel: 'host',
        offset: 0,
        chatInput: '',
      },
      removeChannel('host')
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: '',
      }
    );
  });

  test('Feed contents', () => {
    const result = feedContents(
      {
        channels: {
          default: [
            {
              id: '12345',
              message: 'I like socks',
            },
          ],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: '',
      }
    );
    expect(result).toEqual(
      [
        {
          id: '12345',
          message: 'I like socks',
        },
      ]
    );
  });

  test('Feed contents not default', () => {
    const result = feedContents(
      {
        channels: {
          default: [],
          host: [
            {
              id: '12345',
              message: 'I like socks',
            },
          ],
        },
        currentChannel: 'host',
        offset: 0,
        chatInput: '',
      }
    );
    expect(result).toEqual(
      [
        {
          id: '12345',
          message: 'I like socks',
        },
      ]
    );
  });

  test('Feed listens to message input', () => {
    const result = reducer(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: '',
      },
      chatInput('Hello'),
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        offset: 0,
        chatInput: 'Hello',
      }
    );
  });

  test('Feed update offset', () => {
    const result = reducer(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        offset: -50,
        chatInput: '',
      },
      updateOffset(-50),
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        offset: -100,
        chatInput: '',
      }
    );
  });
});
