// @flow
import { getChannels } from '../../src/navBar/dux';
import { defaultState as defaultFeedState } from '../../src/feed/dux';

describe('NavBar tests', () => {
  test('channel selector test', () => {
    const result = getChannels(
      {
        channels: {
          public: { moments: [] },
          host: { moments: [] },
        },
        currentChannel: 'public',
        chatInput: '',
        currentUser: {
          id: '',
          nickname: 'bob',
        },
        appendingMessage: false,
      }
    );
    expect(result).toEqual([
      {
        id: 'public',
        isCurrent: true,
        hasActions: false,
      },
      {
        id: 'host',
        isCurrent: false,
        hasActions: false,
      },
    ]);
  });

  test('show pip in public', () => {
    const result = getChannels(
      {
        channels: {
          public: {
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                active: true,
              },
            ],
          },
          host: { moments: [] },
        },
        currentChannel: 'public',
        chatInput: '',
        currentUser: {
          id: '',
          nickname: 'bob',
        },
        appendingMessage: false,
      }
    );
    expect(result).toEqual([
      {
        id: 'public',
        isCurrent: true,
        hasActions: true,
      },
      {
        id: 'host',
        isCurrent: false,
        hasActions: false,
      },
    ]);
  });

  test('show pip in host', () => {
    const result = getChannels(
      {
        channels: {
          public: {
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                active: false,
              },
            ],
          },
          host: {
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                active: true,
              },
            ],
          },
        },
        currentChannel: 'public',
        chatInput: '',
        currentUser: {
          id: '',
          nickname: 'bob',
        },
        appendingMessage: false,
      }
    );
    expect(result).toEqual([
      {
        id: 'public',
        isCurrent: true,
        hasActions: false,
      },
      {
        id: 'host',
        isCurrent: false,
        hasActions: true,
      },
    ]);
  });

  test('direct chat name', () => {
    expect(getChannels(
      {
        ...defaultFeedState,
        channels: {
          ...defaultFeedState.channels,
          direct: {
            moments: [],
            participants: [
              {
                id: '12345',
                nickname: 'Bob',
              },
            ],
          },
        },
      }
    )).toEqual(
      [
        {
          id: 'direct',
          isCurrent: false,
          hasActions: false,
          directChatParticipant: 'Bob',
        },
      ]
    );
  });

  test('do not display request or command channels', () => {
    expect(getChannels(
      {
        ...defaultFeedState,
        channels: {
          ...defaultFeedState.channels,
          request: {
            moments: [],
          },
          command: {
            moments: [],
          },
          public: {
            moments: [],
          },
        },
        currentChannel: 'public',
      }
    )).toEqual(
      [
        {
          id: 'public',
          isCurrent: true,
          hasActions: false,
        },
      ]
    );
  });
});
