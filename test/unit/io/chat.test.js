// @flow
//import getReducer from '../../../src/io/chat/dux';
import Chat from '../../../src/io/chat/chat';
import getReducer, { setChatKeys, setUser, addChat } from '../../../src/io/chat/dux';
import { chatInput, addToCurrentChannel } from '../../../src/chat/dux';
import { changeChannel } from '../../../src/feed/dux';
import { MESSAGE } from '../../../src/moment/dux';

describe('Chat IO reducer test', () => {
  let chat;
  let reducer;

  beforeEach(() => {
    chat = {
      setKeys: jest.fn(),
      setUser: jest.fn(),
      addChat: jest.fn(),
      publish: jest.fn(),
    };

    const mock = (mockObject: any): Chat => mockObject;

    reducer = getReducer(mock(chat));
  });

  test('set chat keys', () => {
    const result = reducer(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {},
        chatInput: '',
        currentChannel: 'default',
      },
      setChatKeys('12345', '67890')
    );
    expect(result).toEqual(
      {
        publishKey: '12345',
        subscribeKey: '67890',
        user: {
          id: '',
          nickname: '',
        },
        chats: {},
        chatInput: '',
        currentChannel: 'default',
      }
    );
    expect(chat.setKeys.mock.calls.length).toBe(1);
    expect(chat.setKeys.mock.calls[0][0]).toEqual('12345');
    expect(chat.setKeys.mock.calls[0][1]).toEqual('67890');
  });

  test('set user', () => {
    const result = reducer(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {},
        chatInput: '',
        currentChannel: 'default',
      },
      setUser('12345', 'Billy Bob')
    );
    expect(result).toEqual(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        },
        chats: {},
        chatInput: '',
        currentChannel: 'default',
      }
    );
    expect(chat.setUser.mock.calls.length).toBe(1);
    expect(chat.setUser.mock.calls[0][0]).toEqual('12345');
    expect(chat.setUser.mock.calls[0][1]).toEqual('Billy Bob');
  });

  test('add chat', () => {
    const result = reducer(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {},
        chatInput: '',
        currentChannel: 'default',
      },
      addChat('default', '12345')
    );
    expect(result).toEqual(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {
          default: '12345',
        },
        chatInput: '',
        currentChannel: 'default',
      }
    );
    expect(chat.addChat.mock.calls.length).toBe(1);
    expect(chat.addChat.mock.calls[0][0]).toEqual('default');
    expect(chat.addChat.mock.calls[0][1]).toEqual('12345');
  });

  test('chat input', () => {
    const result = reducer(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {},
        chatInput: '',
        currentChannel: 'default',
      },
      chatInput('Hello buddy'),
    );
    expect(result).toEqual(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {},
        chatInput: 'Hello buddy',
        currentChannel: 'default',
      }
    );
  });

  test('change current channel', () => {
    const result = reducer(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {
          default: '12345',
          host: '67890',
        },
        chatInput: 'Hello buddy',
        currentChannel: 'default',
      },
      changeChannel('host'),
    );
    expect(result).toEqual(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {
          default: '12345',
          host: '67890',
        },
        chatInput: 'Hello buddy',
        currentChannel: 'host',
      }
    );
  });

  test('add to current channel', () => {
    const result = reducer(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {
          default: '12345',
          host: '67890',
        },
        chatInput: 'Hello buddy',
        currentChannel: 'default',
      },
      addToCurrentChannel(),
    );
    expect(result).toEqual(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {
          default: '12345',
          host: '67890',
        },
        chatInput: '',
        currentChannel: 'default',
      }
    );
    expect(chat.publish.mock.calls.length).toBe(1);
    expect(chat.publish.mock.calls[0][0]).toEqual('default');
    expect(chat.publish.mock.calls[0][1].text).toEqual('Hello buddy');
  });
});


describe('Chat IO Interface test', () => {
  let engine;
  let ce;
  let me;
  let ch;

  beforeEach(() => {
    ch = {
      emit: jest.fn(),
      on: jest.fn(),
    };
    me = {
    };
    ce = {
      connect: jest.fn().mockReturnValue(me),
      Chat: jest.fn().mockReturnValue(ch),
      on: jest.fn(),
    };
    engine = {
      create: jest.fn().mockReturnValue(ce),
    };
  });

  test('initializes with a chatEngine', () => {
    const chat = new Chat(engine, () => {});
    expect(chat.chatEngineCore).toBe(engine);
  });

  test('set keys', () => {
    const chat = new Chat(engine, () => {});
    chat.setKeys('12345', '67890');
    expect(engine.create.mock.calls.length).toBe(1);
    expect(engine.create.mock.calls[0][0]).toEqual(
      {
        publishKey: '12345',
        subscribeKey: '67890',
      }
    );
  });

  test('set user does not work unless keys are set', () => {
    const chat = new Chat(engine, () => {});
    chat.setUser('12345', 'Billy Bob');
    expect(ce.connect.mock.calls.length).toBe(0);
  });

  test('set user', () => {
    const chat = new Chat(engine, () => {});
    chat.setKeys('12345', '67890');
    chat.setUser('12345', 'Billy Bob');
    expect(ce.connect.mock.calls.length).toBe(1);
  });

  test('add chat does not work unless keys', () => {
    const chat = new Chat(engine, () => {});
    chat.addChat('default', '12345');
    expect(ce.Chat.mock.calls.length).toBe(0);
  });

  test('add chat', () => {
    const chat = new Chat(engine, () => {});
    chat.setKeys('12345', '67890');
    chat.setUser('12345', 'Billy Bob');
    chat.addChat('default', '12345');
    expect(ce.Chat.mock.calls.length).toBe(1);
    expect(ce.Chat.mock.calls[0][0]).toEqual('12345');
  });

  test('publish dose not work without chat, engine or user', () => {
    const chat = new Chat(engine, () => {});

    chat.publish('default', {
      type: MESSAGE,
      id: '12345',
      text: 'Hello, world!',
      neverRendered: true,
      user: {
        id: '12345',
        nickname: 'Billy Bob',
      },
      messageTrayOpen: false,
    });
    expect(ch.emit.mock.calls.length).toBe(0);

    chat.setKeys('12345', '67890');
    chat.publish('default', {
      type: MESSAGE,
      id: '12345',
      text: 'Hello, world!',
      neverRendered: true,
      user: {
        id: '12345',
        nickname: 'Billy Bob',
      },
      messageTrayOpen: false,
    });
    expect(ch.emit.mock.calls.length).toBe(0);

    chat.setUser('12345', 'Billy Bob');
    chat.publish('default', {
      type: MESSAGE,
      id: '12345',
      text: 'Hello, world!',
      neverRendered: true,
      user: {
        id: '12345',
        nickname: 'Billy Bob',
      },
      messageTrayOpen: false,
    });
    expect(ch.emit.mock.calls.length).toBe(0);
  });

  test('publish', () => {
    const chat = new Chat(engine, () => {});
    chat.setKeys('12345', '67890');
    chat.setUser('12345', 'Billy Bob');
    chat.addChat('default', '12345');
    chat.publish('default', {
      type: MESSAGE,
      id: '12345',
      text: 'Hello, world!',
      neverRendered: true,
      user: {
        id: '12345',
        nickname: 'Billy Bob',
      },
      messageTrayOpen: false,
    });
    expect(ch.emit.mock.calls.length).toBe(1);
    expect(ch.emit.mock.calls[0][0]).toEqual('message');
    expect(ch.emit.mock.calls[0][1]).toEqual(
      {
        id: '12345',
        text: 'Hello, world!',
        neverRendered: true,
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        },
        messageTrayOpen: false,
      },
    );
  });

  test('validate message', () => {
    const chat = new Chat(engine, () => {});
    expect(chat.validMessage(
      {
        type: 'MESSAGE',
        id: '599465b0-23c2-42a7-b837-298e8a51c94f',
        text: 'Hello, world!',
        user: {
          id: '599465b0-23c2-42a7-b837-298e8a51c94a',
          nickname: 'Billy Bob',
        },
        messageTrayOpen: false,
      }
    )).toBe(true);
  });

  test('receive', () => {
    const addToChannel = jest.fn();
    const chat = new Chat(engine, addToChannel);
    chat.setKeys('12345', '67890');
    chat.setUser('bb', 'Billy Bob');

    
    let cb = payload => {}; /* eslint-disable-line no-unused-vars */
    ch.on = (event, callback) => {
      cb = callback;
    };

    chat.addChat('public', '67890');
    
    cb(
      {
        sender: {
          uuid: '599465b0-23c2-42a7-b837-298e8a51c94a',
        },
        data: {
          type: 'MESSAGE',
          id: '599465b0-23c2-42a7-b837-298e8a51c94f',
          text: 'Hello, world!',
          user: {
            id: '599465b0-23c2-42a7-b837-298e8a51c94a',
            nickname: 'Billy Bob',
          },
          messageTrayOpen: false,
        },
      }
    );

    expect(addToChannel.mock.calls.length).toBe(1);
    expect(addToChannel.mock.calls[0][0]).toEqual('public');
    expect(addToChannel.mock.calls[0][1]).toEqual(
      {
        type: 'MESSAGE',
        id: '599465b0-23c2-42a7-b837-298e8a51c94f',
        text: 'Hello, world!',
        user: {
          id: '599465b0-23c2-42a7-b837-298e8a51c94a',
          nickname: 'Billy Bob',
        },
        messageTrayOpen: false,
      }
    );
  });

  test('receive malformed message', () => {
    const addToChannel = jest.fn();
    const chat = new Chat(engine, addToChannel);
    chat.setKeys('12345', '67890');
    chat.setUser('bb', 'Billy Bob');

    
    let cb = payload => {}; /* eslint-disable-line no-unused-vars */
    ch.on = (event, callback) => {
      cb = callback;
    };

    chat.addChat('public', '67890');
    
    cb(
      {
        sender: {
          uuid: '599465b0-23c2-42a7-b837-298e8a51c94a',
        },
        data: {
          hey: 'I am not a message',
          reject: true,
        },
      }
    );

    expect(addToChannel.mock.calls.length).toBe(0);
  });
});
