// @flow
//import getReducer from '../../../src/io/chat/dux';
import Chat from '../../../src/io/chat/chat';

describe('Chat IO reducer test', () => {
  test('initializes with a chatEngine', () => {
  });
});


describe('Chat IO Interface test', () => {
  let engine;

  beforeEach(() => {
    engine = {
      create: jest.fn(),
    };
  });

  test('initializes with a chatEngine', () => {
    const chat = new Chat(engine);
    expect(chat.chatEngineCore).toBe(engine);
  });

  test('set keys', () => {
    const chat = new Chat(engine);
    chat.setKeys('12345', '67890');
    expect(engine.create.mock.calls.length).toBe(1);
    expect(engine.create.mock.calls[0][0]).toEqual(
      {
        publishKey: '12345',
        subscribeKey: '67890',
      }
    );
  });
});