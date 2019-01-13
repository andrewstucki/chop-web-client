// @flow
import { getPlaceholder }  from '../../src/selectors/chatSelectors';

import { defaultState as defaultFeedState } from '../../src/feed/dux';

describe('Chat', () => {
  test('get placeholder for event', () => {
    const result = getPlaceholder(
      {
        ...defaultFeedState,
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'public',
          },
        },
      },
    );
    expect(result).toEqual('Chat');
  });

  test('get placeholder for host', () => {
    const result = getPlaceholder(
      {
        ...defaultFeedState,
        panes: {
          primary: {
            type: 'CHAT',
            channelId: 'host',
          },
        },
        channels: {
          host: {
            id: '12345',
            name: 'Host',
            moments: [],
            anchorMoments: [],
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
            scrollPosition: 0,
          },
        },
      },
      'host',
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
            name: 'Direct',
            moments: [],
            anchorMoments: [],
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
            scrollPosition: 0,
          },
        },
        panes: {
          primary: {
            type: 'CHAT',
            channelId: 'direct',
          },
        },
        currentUser: {
          id: '12345',
          pubnubToken: '12345',
          pubnubAccessKey: '12345',
          name: 'Bobby G.',
          role: {
            label: '',
            permissions: [],
          },
        },
      },
      'direct',
    );
    expect(result).toEqual('Chat');
  });
});
