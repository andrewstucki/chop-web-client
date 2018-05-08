// @flow
import reducer, { CHAT_INPUT, createMessage }  from '../../../src/chat/ducks';

describe('Chat', () => {
  test('reducer with no values', () => {
    const result = reducer();
    expect(result).toEqual(
      {
        currentInput: '',
      }
    )
  });

  test('reducer CHAT_INPUT', () => {
    const result = reducer(
      {
        currentInput: '',
      },
      {
        type: CHAT_INPUT,
        value: 'Love',
      });

    expect(result).toEqual(
      {
        currentInput: 'Love',
      });
  });

  test('createMessage', () => {
    const message = createMessage("I like cookies!");
    expect(message.message).toEqual("I like cookies!");
    expect(message.id.length).toEqual(36);
  });
});