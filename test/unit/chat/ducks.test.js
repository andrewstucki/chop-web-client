// @flow
import reducer, { CHAT_INPUT, TOGGLE_CHAT_FOCUS, ADD_TO_CURRENT_CHANNEL, createMessage, textEntered }  from '../../../src/chat/ducks';

describe('Chat', () => {
  test('reducer with no values', () => {
    const result = reducer();
    expect(result).toEqual(
      {
        currentInput: '',
        focused: false,
      }
    )
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
    const message = createMessage("I like cookies!");
    expect(message.message).toEqual("I like cookies!");
    expect(message.id.length).toEqual(36);
  });

  test('textEntered', () => {
    let state =       {
      currentInput: '',
      focused: false,
    }
    expect(textEntered(state)).toBeFalsy();
    state.currentInput = 'Hello';
    expect(textEntered(state)).toBeTruthy();
  })

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
    )

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
    )
  })

  test('message added', () => {
    const result = reducer(
      {
        currentInput: 'Hi everyone!',
        focused: false,
      },
      {
        type: ADD_TO_CURRENT_CHANNEL,
        message: {
          id: '12345',
          message: 'Hi everyone!'
        },
      });
    expect(result).toEqual(
      {
        currentInput: '',
        focused: false,
      }
    )
  })
});