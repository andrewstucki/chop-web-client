// @flow
import reducer, {
  changeChannel,
  addToChannel,
  addChannel,
  removeChannel,
  feedContents,
  updateOffset,
  defaultState,
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
    });
  });

  test('adds a message to current channel from current user', () => {
    const result = reducer(
      {
        ...defaultState,
        chatInput: 'this is a message',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob'
        }
      },
      addToCurrentChannel(),
    );
    expect(result.channels.default.length).toEqual(1);
    expect(result.channels.default[0].message).toEqual('this is a message');
    expect(result.channels.default[0].user.id).toEqual('12345');
    expect(result.channels.default[0].user.nickname).toEqual('Billy Bob');
    expect(result.channels.default[0].id.length).toEqual(36);
  });

  test('adds a message to current channel not default from current user', () => {
    const result = reducer(
      {
        ...defaultState,
        currentChannel: 'host',
        chatInput: 'this is a string',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob'
        }
      },
      addToCurrentChannel()
    );
    expect(result.channels.default.length).toEqual(0);
    expect(result.channels.host.length).toEqual(1);
    expect(result.channels.host[0].message).toEqual('this is a string');
    expect(result.channels.host[0].user.id).toEqual('12345');
    expect(result.channels.host[0].user.nickname).toEqual('Billy Bob');
    expect(result.channels.host[0].id.length).toEqual(36);
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
        }
      })
    );
    expect(result.channels.default.length).toEqual(0);
    expect(result.channels.host.length).toEqual(1);
    expect(result.channels.host[0].message).toEqual('Hello there');
    expect(result.channels.host[0].id.length).toEqual(5);
  });

  test('add a channel', () => {
    const result = reducer(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
      }
    );
  });

  test('add a channel that already exsists', () => {
    const result = reducer(
      {
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
              }
            },
          ],
        },
        currentChannel: 'default',
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
      },
      addChannel('host')
    );
    expect(result).toEqual(
      {
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
              }
            },
          ],
        },
        currentChannel: 'default',
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
      },
      removeChannel('host')
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
      },
      removeChannel('default')
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
      },
      removeChannel('host')
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
      }
    );
  });

  test('Feed contents', () => {
    const result = feedContents(
      {
        channels: {
          default: 
          [
            {
              id: '12345',
              message: 'I like socks',
              user: {
                id: '12345',
                nickname: 'Billy Bob',
              }
            },
          ],
        },
        currentChannel: 'default',
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
          }
        },
      ],
    );
  });

  test('Feed contents not default', () => {
    const result = feedContents(
      {
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
              }
            },
          ],
        },
        currentChannel: 'host',
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
          }
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
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
      },
      chatInput('Hello'),
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        chatInput: 'Hello',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
      }
    );
  });

  test('Accepts a user', () => {
    const result = reducer(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        chatInput: '',
        currentUser: {
          id: '',
          nickname: '',
        }
      },
      setUser('12345', 'Billy Bob'),
    );
    expect(result).toEqual(
      {
        channels: {
          default: [],
        },
        currentChannel: 'default',
        chatInput: '',
        currentUser: {
          id: '12345',
          nickname: 'Billy Bob',
        }
      }
    );
  });
});
