// @flow
//import getReducer from '../../../src/io/chat/dux';
import Chat from '../../../src/io/chat/chat';

describe('Chat IO reducer test', () => {
  test('initializes with a chatEngine', () => {
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
    }
    me = {
    };
    ce = {
      connect: jest.fn().mockReturnValue(me),
      Chat: jest.fn().mockReturnValue(ch),
    }
    engine = {
      create: jest.fn().mockReturnValue(ce),
    };
  });

  test('initializes with a chatEngine', () => {
    const chat = new Chat(engine, function () {});
    expect(chat.chatEngineCore).toBe(engine);
  });

  test('set keys', () => {
    const chat = new Chat(engine, function () {});
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
    const chat = new Chat(engine, function () {});
    chat.setUser('12345', 'Billy Bob');
    expect(ce.connect.mock.calls.length).toBe(0);
  });

  test('set user', () => {
    const chat = new Chat(engine, function () {});
    chat.setKeys('12345', '67890');
    chat.setUser('12345', 'Billy Bob');
    expect(ce.connect.mock.calls.length).toBe(1);
    expect(chat.me).toBe(me);
  });

  test('add chat does not work unless keys and user', () => {
    const chat = new Chat(engine, function () {});
    chat.setKeys('12345', '67890');
    chat.addChat('default', '12345');
    expect(ce.Chat.mock.calls.length).toBe(0);
  });

  test('add chat', () => {
    const chat = new Chat(engine, function () {});
    chat.setKeys('12345', '67890');
    chat.setUser('12345', 'Billy Bob');
    chat.addChat('default', '12345');
    expect(ce.Chat.mock.calls.length).toBe(1);
    expect(ce.Chat.mock.calls[0][0]).toEqual('12345');
  });

  test('publish dose not work without chat, engine or user', () => {
    const chat = new Chat(engine, function () {});

    chat.publish('default', {
      id: '12345',
      message: 'Hello, world!',
    })
    expect(ch.emit.mock.calls.length).toBe(0);

    chat.setKeys('12345', '67890');
    chat.publish('default', {
      id: '12345',
      message: 'Hello, world!',
    })
    expect(ch.emit.mock.calls.length).toBe(0);

    chat.setUser('12345', 'Billy Bob');
    chat.publish('default', {
      id: '12345',
      message: 'Hello, world!',
    })
    expect(ch.emit.mock.calls.length).toBe(0);
  });

  test('publish', () => {
    const chat = new Chat(engine, function () {});
    chat.setKeys('12345', '67890');
    chat.setUser('12345', 'Billy Bob');
    chat.addChat('default', '12345');
    chat.publish('default', {
      id: '12345',
      message: 'Hello, world!',
    })
    expect(ch.emit.mock.calls.length).toBe(1);
    expect(ch.emit.mock.calls[0][0]).toEqual('message');
    expect(ch.emit.mock.calls[0][1]).toEqual(
      {
        id: '12345',
        message: 'Hello, world!',
      }
    );
  });

  test('recive', () => {
    const addToChannel = jest.fn();
    const chat = new Chat(engine, addToChannel);
    chat.setKeys('12345', '67890');
    chat.setUser('12345', 'Billy Bob');

    let cb = (event, payload) => {};
    ch.on = (event, callback) => {
      cb = callback;
    };

    chat.addChat('default', '12345');
    
    cb(
      'message',
      {
        id: '12345',
        message: 'Hello, world!',
      }
    );

    expect(addToChannel.mock.calls.length).toBe(1);
    expect(addToChannel.mock.calls[0][0]).toEqual('default');
    expect(addToChannel.mock.calls[0][1]).toEqual(
      {
        id: '12345',
        message: 'Hello, world!',
      }
    );
  });
});