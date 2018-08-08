// @flow
import reducer,
{
  TOGGLE_CHAT_FOCUS,
  defaultState,
  getPlaceholder,
}  from '../../src/chat/dux';

import { defaultState as defaultFeedState } from '../../src/feed/dux';

describe('Chat', () => {
  test('reducer with no values', () => {
    const result = reducer();
    expect(result).toEqual(defaultState);
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
                id: '12345',
                nickname: 'Bobby G.',
              },
              {
                id: '54353',
                nickname: 'Shaq O.',
              },
            ],
          },
        },
        currentChannel: 'direct',
        currentUser: {
          id: '12345',
          nickname: 'Bobby G.',
        },
      },
    );
    expect(result).toEqual('Chat with Shaq O.');
  });
});
