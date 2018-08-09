// @flow
import { getPlaceholder }  from '../../src/chat/dux';

import { defaultState as defaultFeedState } from '../../src/feed/dux';

describe('Chat', () => {
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
