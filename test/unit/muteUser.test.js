// @flow
import { receiveMuteUser } from '../../src/moment/message/dux';
import reducer, { defaultState} from '../../src/feed/dux';

describe('Mute User tests', () => {
  test('User is added when a mute message is received.', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          test: {
            id: 'test',
            name: 'test',
            direct: false,
            anchorMoments: [],
            moments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
        panes: {
          primary: {
            active: {
              type: 'EVENT',
              content: {
                channelId: 'test',
              },
            },
          },
        },
      },
      receiveMuteUser('blockme'));

    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          test: {
            id: 'test',
            name: 'test',
            direct: false,
            anchorMoments: [],
            moments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
        panes: {
          primary: {
            active: {
              type: 'EVENT',
              content: {
                channelId: 'test',
              },
            },
          },
        },
        mutedUsers: [
          'blockme',
        ],
      }
    );
  });

  test('Duplicate users are not added.', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        channels: {
          test: {
            id: 'test',
            name: 'test',
            direct: false,
            anchorMoments: [],
            moments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
        panes: {
          primary: {
            active: {
              type: 'EVENT',
              content: {
                channelId: 'test',
              },
            },
          },
        },
        mutedUsers: ['blockme'],
      },
      receiveMuteUser('blockme'));

    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          test: {
            id: 'test',
            name: 'test',
            direct: false,
            anchorMoments: [],
            moments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1546896104521,
          },
        },
        panes: {
          primary: {
            active: {
              type: 'EVENT',
              content: {
                channelId: 'test',
              },
            },
          },
        },
        mutedUsers: [
          'blockme',
        ],
      }
    );
  });
});
