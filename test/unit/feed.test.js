// @flow
import reducer, {
  changeChannel,
  addToChannel,
  addChannel,
  removeChannel,
  feedContents,
} from '../../src/feed/dux';

import {
  addToCurrentChannel,
  createMessage,
} from '../../src/chat/dux';

describe('Feed', () => {
  test('default state', () => {
    const result = reducer();
    expect(result).toEqual({
      channels: {
        default: [],
      },
      currentChannel: 'default',
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
      },
      changeChannel('host')
    );
    expect(result).toEqual({
      channels: {
        default: [],
        host: [],
      },
      currentChannel: 'host',
    });
  });

  test('change current channel', () => {
    const result = reducer(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
      },
      changeChannel('host')
    );
    expect(result).toEqual({
      channels: {
        default: [],
      },
      currentChannel: 'default',
    });
  });

  test('adds a message to current channel', () => {
    const result = reducer(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
      },
      addToCurrentChannel(createMessage('this is a message'))
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
      },
      addToCurrentChannel(createMessage('this is a string'))
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
      },
      addToChannel('host', createMessage('this is a string'))
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
      },
      removeChannel('host')
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
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
      },
      removeChannel('default')
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
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
      },
      removeChannel('host')
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
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
});
