// @flow
import reducer, { CHAT_INPUT, TOGGLE_CHAT_FOCUS, ADD_TO_CURRENT_CHANNEL, createMessage, textEntered }  from '../../src/chat/dux';

describe('Chat', () => {
  test('reducer with no values', () => {
    const result = reducer();
    expect(result).toEqual(
      {
        currentInput: '',
        focused: false,
      }
    );
  });

  test('reducer CHAT_INPUT', () => {
    const result = reducer(
      {
        currentInput: '',
        focused: false,
      },
      {
        type: CHAT_INPUT,
        value: 'Love',
      });

    expect(result).toEqual(
      {
        currentInput: 'Love',
        focused: false,
      });
  });

  test('createMessage', () => {
    const message = createMessage(
      '12345',
      'I like cookies!',
      {
        id: '12345',
        nickname:'Billy Bob',
      }
    );
    expect(message.message).toEqual('I like cookies!');
    expect(message.id.length).toEqual(5);
    expect(message.currentUser.nickname).toEqual('Billy Bob');
    expect(message.currentUser.id.length).toEqual(5);
  });

  test('textEntered', () => {
    const state =       {
      currentInput: '',
      focused: false,
    };
    expect(textEntered(state)).toBeFalsy();
    state.currentInput = 'Hello';
    expect(textEntered(state)).toBeTruthy();
  });

  test('chat focus', () => {
    const result = reducer(
      {
        currentInput: '',
        focused: false,
      },
      {
        type: TOGGLE_CHAT_FOCUS,
        focus: true,
      });
    expect(result).toEqual(
      {
        currentInput: '',
        focused: true,
      }
    );

    const result2 = reducer(
      {
        currentInput: '',
        focused: true,
      },
      {
        type: TOGGLE_CHAT_FOCUS,
        focus: false,
      });
    expect(result2).toEqual(
      {
        currentInput: '',
        focused: false,
      }
    );
  });

  test('message added', () => {
    const result = reducer(
      {
        currentInput: 'Hi everyone!',
        focused: false,
      },
      {
        type: ADD_TO_CURRENT_CHANNEL,
        id: '12345',
      },
    );
    expect(result).toEqual(
      {
        currentInput: '',
        focused: false,
      }
    );
  });
});
