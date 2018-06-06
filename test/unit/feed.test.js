// @flow
import reducer, {
  changeChannel,
  addToChannel,
  addChannel,
  removeChannel,
  feedContents,
  defaultState,
  appendMessage,
} from '../../src/feed/dux';

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
      },
      addToCurrentChannel(),
    );
    expect(result.channels.default.length).toEqual(1);
    expect(result.channels.default[0].message).toEqual('this is a message');
    expect(result.channels.default[0].user.id).toEqual('12345');
    expect(result.channels.default[0].user.nickname).toEqual('Billy Bob');
    expect(result.channels.default[0].id.length).toEqual(36);
    expect(result.appendingMessage).toBe(true);
  });

  test('adds a message to current channel not default from current user', () => {
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
    expect(result.channels.default.length).toEqual(0);
    expect(result.channels.host.length).toEqual(1);
    expect(result.channels.host[0].message).toEqual('this is a string');
    expect(result.channels.host[0].user.id).toEqual('12345');
    expect(result.channels.host[0].user.nickname).toEqual('Billy Bob');
    expect(result.channels.host[0].id.length).toEqual(36);
    expect(result.appendingMessage).toBe(true);
  });

  test('adds a message to not current channel', () => {
    const result = reducer(
      {
        ...defaultState,
        currentChannel: 'default',
        chatInput: 'this is a string',
      },
      addToChannel('host', {
        id: '12345',
        message: 'Hello there',
        neverRendered: true,
        user: {
          id: '',
          nickname: '',
        },
      })
    );
    expect(result.channels.default.length).toEqual(0);
    expect(result.channels.host.length).toEqual(1);
    expect(result.channels.host[0].message).toEqual('Hello there');
    expect(result.channels.host[0].id.length).toEqual(5);
    expect(result.appendingMessage).toBe(true);
  });

  test('add a channel', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          default: [],
        },
      },
      addChannel('host')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          default: [],
          host: [],
        },
      },
    );
  });

  test('add a channel that already exsists', () => {
    const result = reducer(defaultState, addChannel('host'));
    expect(result).toEqual(defaultState);
  });

  test('remove channel', () => {
    const result = reducer(defaultState, removeChannel('host'));
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          default: [],
        },
      },
    );
  });

  test('remove default', () => {
    const result = reducer(
      {
        ...defaultState,
        channels: {
          default: [],
        },
      },
      removeChannel('default')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          default: [],
        },
      },
    );
  });

  test('remove current channel', () => {
    const result = reducer(
      {
        ...defaultState,
        currentChannel: 'host',
      },
      removeChannel('host')
    );
    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          default: [],
        },
        currentChannel: 'default',
      },
    );
  });

  test('Feed contents', () => {
    const result = feedContents(
      {
        ...defaultState,
        channels: {
          default: 
          [
            {
              id: '12345',
              message: 'I like socks',
              user: {
                id: '12345',
                nickname: 'Billy Bob',
              },
            },
          ],
        },
        currentChannel: 'default',
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
          message: 'I like socks',
          user: {
            id: '12345',
            nickname: 'Billy Bob',
          },
        },
      ],
    );
  });

  test('Feed contents not default', () => {
    const result = feedContents(
      {
        ...defaultState,
        channels: {
          default: [],
          host: 
          [
            {
              id: '12345',
              message: 'I like socks',
              user: {
                id: '12345',
                nickname: 'Billy Bob',
              },
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
          message: 'I like socks',
          user: {
            id: '12345',
            nickname: 'Billy Bob',
          },
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
});
