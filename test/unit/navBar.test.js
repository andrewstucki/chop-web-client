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
          '1234': {
            id: '1234',
            name: 'public',
            moments: [],
            anchorMoments: [],
          },
          '12345': {
            id: '12345',
            name: 'host',
            moments: [],
            anchorMoments: [],
          },
        },
        currentChannel: '1234',
        chatInput: '',
        currentUser: currentUser,
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
          anchorMomentAnchored: true,
        },
        placeholderPresent: false,
      }
    );
    expect(result).toEqual([
      {
        id: '1234',
        name: 'public',
        isCurrent: true,
        hasActions: false,
        otherUsersNames: [],
      },
      {
        id: '12345',
        name: 'host',
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
          '1234': {
            id: '12345',
            name: 'public',
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                active: true,
              },
            ],
            anchorMoments: [],
          },
          '12345': {
            id: '12345',
            name: 'host',
            moments: [],
            anchorMoments: [],
          },
        },
        currentChannel: '1234',
        chatInput: '',
        currentUser: currentUser,
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
          anchorMomentAnchored: true,
        },
        placeholderPresent: false,
      }
    );
    expect(result).toEqual([
      {
        id: '1234',
        name: 'public',
        isCurrent: true,
        hasActions: true,
        otherUsersNames: [],
      },
      {
        id: '12345',
        name: 'host',
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
          '1234': {
            id: '1234',
            name: 'public',
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                active: false,
              },
            ],
            anchorMoments: [],
          },
          '12345': {
            id: '12345',
            name: 'host',
            moments: [
              {
                type: 'ACTIONABLE_NOTIFICATION',
                active: true,
              },
            ],
            anchorMoments: [],
          },
        },
        currentChannel: '1234',
        chatInput: '',
        currentUser: currentUser,
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
          anchorMomentAnchored: true,
        },
        placeholderPresent: false,
      }
    );
    expect(result).toEqual([
      {
        id: '1234',
        name: 'public',
        isCurrent: true,
        hasActions: false,
        otherUsersNames: [],
      },
      {
        id: '12345',
        name: 'host',
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
          '12345': {
            id: '12345',
            name: 'direct',
            moments: [],
            anchorMoments: [],
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
          id: '12345',
          name: 'direct',
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
          '1234': {
            id: '12345',
            name: 'Legacy',
            moments: [],
            anchorMoments: [],
          },
          '123456': {
            id: '12345',
            name: 'Personal',
            moments: [],
            anchorMoments: [],
          },
          '12345': {
            id: '12345',
            name: 'Public',
            moments: [],
            anchorMoments: [],
          },
        },
        currentChannel: '12345',
      }
    )).toEqual(
      [
        {
          id: '12345',
          name: 'Public',
          isCurrent: true,
          hasActions: false,
          otherUsersNames: [],
        },
      ]
    );
  });
});
