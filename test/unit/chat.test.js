// @flow
import reducer,
{
  CHAT_INPUT,
  TOGGLE_CHAT_FOCUS,
  PUBLISH_MESSAGE,
  textEntered,
  defaultState,
  getPlaceholder,
}  from '../../src/chat/dux';

import { defaultState as defaultFeedState } from '../../src/feed/dux';

import { createMessage } from '../../src/moment';

describe('Chat', () => {
  test('reducer with no values', () => {
    const result = reducer();
    expect(result).toEqual(defaultState);
  });

  test('reducer CHAT_INPUT', () => {
    const result = reducer(
      defaultState,
      {
        type: CHAT_INPUT,
        value: 'Love',
      });

    expect(result).toEqual(
      {
        ...defaultState,
        currentInput: 'Love',
      });
  });

  test('createMessage', () => {
    const message = createMessage(
      '12345',
      'I like cookies!',
      {
        id: '12345',
        nickname:'Billy Bob',
      },
      false
    );
    expect(message.text).toEqual('I like cookies!');
    expect(message.id.length).toEqual(5);
    expect(message.user.nickname).toEqual('Billy Bob');
    expect(message.user.id.length).toEqual(5);
  });

  test('textEntered', () => {
    const state = defaultState;
    expect(textEntered(state)).toBeFalsy();
    state.currentInput = 'Hello';
    expect(textEntered(state)).toBeTruthy();
  });

  test('chat focus', () => {
    const result = reducer(
      defaultState,
      {
        type: TOGGLE_CHAT_FOCUS,
        focus: true,
      });
    expect(result).toEqual(
      {
        ...defaultState,
        focused: true,
      }
    );

    const result2 = reducer(
      {
        ...defaultState,
        focused: true,
      },
      {
        type: TOGGLE_CHAT_FOCUS,
        focus: false,
      });
    expect(result2).toEqual(defaultState);
  });

  test('message added', () => {
    const result = reducer(
      {
        ...defaultState,
        currentInput: 'Hi everyone!',
      },
      {
        type: PUBLISH_MESSAGE,
        id: '12345',
      },
    );
    expect(result).toEqual({
      ...defaultState,
      currentInput: '',
    });
  });

  test('get placeholder for event', () => {
    const result = getPlaceholder(
      {
        ...defaultFeedState,
        currentChannel: 'public',
      },
    );
    expect(result).toEqual('Chat');
  });

  test('get placeholder for host', () => {
    const result = getPlaceholder(
      {
        ...defaultFeedState,
        currentChannel: 'host',
      },
    );
    expect(result).toEqual('Chat with hosts');
  });

  test('get placeholder for direct chat', () => {
    const result = getPlaceholder(
      {
        ...defaultFeedState,
        channels: {
          ...defaultFeedState.channels,
          direct: {
            id: '12345',
            name: 'direct',
            moments: [],
            participants: [
              {
                pubnubToken: '12345',
                name: 'Bobby G.',
                role: { label: '' },
              },
              {
                pubnubToken: '54353',
                name: 'Shaq O.',
                role: { label: '' },
              },
            ],
          },
        },
        currentChannel: 'direct',
        currentUser: {
          id: '12345',
          pubnubToken: '12345',
          pubnubAccessToken: '12345',
          name: 'Bobby G.',
          role: {
            label: '',
            permissions: [],
          },
        },
      },
    );
    expect(result).toEqual('Chat with Shaq O.');
  });
});
