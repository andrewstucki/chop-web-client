// @flow
import { getChannels } from '../../src/navBar/dux';
import { defaultState as defaultFeedState } from '../../src/feed/dux';

const otherUser = {
  pubnubToken: '12345',
  name: 'Billy Bob',
  role: {
    label: '',
  },
};
const currentUser = {
  id: '12345',
  pubnubToken: '09876',
  pubnubAccessKey: '67890',
  name: 'Joan Jet',
  role: {
    label: '',
    permissions: [],
  },
};

describe('NavBar tests', () => {
  test('channel selector test', () => {
    const result = getChannels(
      {
        ...defaultFeedState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [],
          },
          host: {
            id: '12345',
            name: 'host',
            moments: [],
          },
        },
        currentChannel: 'public',
        chatInput: '',
        currentUser: currentUser,
        appendingMessage: false,
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
          anchorMomentAnchored: true,
        },
        animatingMoment: false,
        placeholderPresent: false,
      }
    );
    expect(result).toEqual([
      {
        id: 'public',
        isCurrent: true,
        hasActions: false,
        otherUsersNames: [],
      },
      {
        id: 'host',
        isCurrent: false,
        hasActions: false,
        otherUsersNames: [],
      },
    ]);
  });

  test('show pip in public', () => {
    const result = getChannels(
      {
        ...defaultFeedState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                active: true,
              },
            ],
          },
          host: {
            id: '12345',
            name: 'host',
            moments: [],
          },
        },
        currentChannel: 'public',
        chatInput: '',
        currentUser: currentUser,
        appendingMessage: false,
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
          anchorMomentAnchored: true,
        },
        animatingMoment: false,
        placeholderPresent: false,
      }
    );
    expect(result).toEqual([
      {
        id: 'public',
        isCurrent: true,
        hasActions: true,
        otherUsersNames: [],
      },
      {
        id: 'host',
        isCurrent: false,
        hasActions: false,
        otherUsersNames: [],
      },
    ]);
  });

  test('show pip in host', () => {
    const result = getChannels(
      {
        ...defaultFeedState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                active: false,
              },
            ],
          },
          host: {
            id: '12345',
            name: 'host',
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
        currentUser: currentUser,
        appendingMessage: false,
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
          anchorMomentAnchored: true,
        },
        animatingMoment: false,
        placeholderPresent: false,
      }
    );
    expect(result).toEqual([
      {
        id: 'public',
        isCurrent: true,
        hasActions: false,
        otherUsersNames: [],
      },
      {
        id: 'host',
        isCurrent: false,
        hasActions: true,
        otherUsersNames: [],
      },
    ]);
  });

  test('otherUsersNames', () => {
    expect(getChannels(
      {
        ...defaultFeedState,
        channels: {
          ...defaultFeedState.channels,
          direct: {
            id: '12345',
            name: 'direct',
            moments: [],
            participants: [
              otherUser,
              otherUser,
              otherUser,
            ],
          },
        },
        currentUser: currentUser,
      }
    )).toEqual(
      [
        {
          id: 'direct',
          isCurrent: false,
          hasActions: false,
          otherUsersNames: ['Billy Bob', 'Billy Bob', 'Billy Bob'],
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
            id: '12345',
            name: 'request',
            moments: [],
          },
          command: {
            id: '12345',
            name: 'command',
            moments: [],
          },
          public: {
            id: '12345',
            name: 'public',
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
          otherUsersNames: [],
        },
      ]
    );
  });
});
