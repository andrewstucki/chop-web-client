// @flow
import reducer, {
  changeChannel,
  addToChannel,
  addChannel,
  removeChannel,
  feedContents,
  getOffset,
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
    expect(result.channels.default.messages.length).toEqual(1);
    expect(result.channels.default.offset).toEqual(0);
    expect(result.channels.default.messages[0].message).toEqual('this is a message');
    expect(result.channels.host.messages[0].user.id).toEqual('12345');
    expect(result.channels.host.messages[0].user.nickname).toEqual('Billy Bob');
    expect(result.channels.default.messages[0].id.length).toEqual(36);
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
    expect(result.channels.default.messages.length).toEqual(0);
    expect(result.channels.host.messages.length).toEqual(1);
    expect(result.channels.host.messages[0].message).toEqual('this is a string');
    expect(result.channels.host.messages[0].currentUser.id).toEqual('12345');
    expect(result.channels.host.messages[0].currentUser.nickname).toEqual('Billy Bob');
    expect(result.channels.host.messages[0].id.length).toEqual(36);
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
    expect(result.channels.default.messages.length).toEqual(0);
    expect(result.channels.host.messages.length).toEqual(1);
    expect(result.channels.host.messages[0].message).toEqual('Hello there');
    expect(result.channels.host.messages[0].id.length).toEqual(5);
  });

  test('add a channel', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
        user: {
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
          default: {messages: [], offset: 0},
          host: {
            messages: [
              {
                id: '12345',
                message: 'I like socks',
                neverRendered: true,
                user: {
                  id: '12345',
                  nickname: 'Billy Bob',
                }
              },
            ],
            offset:0,
          },
        },
        currentChannel: 'default',
        chatInput: '',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
                user: {
                  id: '12345',
                  nickname: 'Billy Bob',
                }
              },
            ],
            offset: 0,
          },
        },
        currentChannel: 'default',
        chatInput: '',
        user: {
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
          default: {messages: [], offset: 0},
          host: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
        user: {
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
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
        user: {
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
          default: {messages: [], offset: 0},
          host: {messages: [], offset: 0},
        },
        currentChannel: 'host',
        chatInput: '',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
        user: {
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
          default: {
            messages: [
              {
                id: '12345',
                message: 'I like socks',
                neverRendered: true,
                user: {
                  id: '12345',
                  nickname: 'Billy Bob',
                }
              },
            ],
            offset: 0,
          },
        },
        currentChannel: 'default',
        chatInput: '',
        user: {
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
          neverRendered: true,
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
          default: {messages: [], offset: 0},
          host: {
            messages: [
              {
                id: '12345',
                message: 'I like socks',
                neverRendered: true,
                user: {
                  id: '12345',
                  nickname: 'Billy Bob',
                }
              },
            ],
            offset: 0,
          },
        },
        currentChannel: 'host',
        chatInput: '',
        user: {
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
          neverRendered: true,
          user: {
            id: '12345',
            nickname: 'Billy Bob',
          }
        },
      ]
    );
  });

  test('Get offset', () => {
    const result = getOffset(
      {
        channels: {
          default: {messages: [], offset: 5},
          host: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        }
      }
    );
    expect(result).toEqual(5);
  });

  test('Get offset not default channel', () => {
    const result = getOffset(
      {
        channels: {
          default: {messages: [], offset: 0},
          host: {messages: [], offset: 5},
        },
        currentChannel: 'host',
        chatInput: '',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        }
      }
    );
    expect(result).toEqual(5);
  });

  test('Feed listens to message input', () => {
    const result = reducer(
      {
        channels: {
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
              user: {
                id: '12345',
                nickname: 'Billy Bob',
              }
            },
          ], offset: -50},
        },
        currentChannel: 'default',
        chatInput: '',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        }
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
              user: {
                id: '12345',
                nickname: 'Billy Bob',
              }
            },
          ], offset: -100},
        },
        currentChannel: 'default',
        chatInput: '',
        user: {
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
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
        user: {
          id: '',
          nickname: '',
        }
      },
      setUser('12345', 'Billy Bob'),
    );
    expect(result).toEqual(
      {
        channels: {
          default: {messages: [], offset: 0},
        },
        currentChannel: 'default',
        chatInput: '',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        }
      }
    );
  });
});
