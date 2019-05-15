// @flow
import { receiveMuteUser } from '../../src/users/dux';
import reducer, { defaultState} from '../../src/chop/dux';

describe('Mute User tests', () => {
  test('User is added when a mute message is received.', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        feed: {
          ...defaultState.feed,
          channels: {
            test: {
              id: 'test',
              name: 'test',
              type: 'public',
              direct: false,
              placeholder: false,
              anchorMoments: [],
              moments: [],
              scrollPosition: 0,
              sawLastMomentAt: 1546896104521,
              participants: [],
            },
          },
          panes: {
            primary: {
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
        feed: {
          ...defaultState.feed,
          channels: {
            test: {
              id: 'test',
              name: 'test',
              type: 'public',
              direct: false,
              placeholder: false,
              anchorMoments: [],
              moments: [],
              scrollPosition: 0,
              sawLastMomentAt: 1546896104521,
              participants: [],
            },
          },
          panes: {
            primary: {
              type: 'EVENT',
              content: {
                channelId: 'test',
              },
            },
          },
        },
        user: {
          ...defaultState.user,
          mutedUsers: [
            'blockme',
          ],
        },
      }
    );
  });

  test('Duplicate users are not added.', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        feed: {
          ...defaultState.feed,
          channels: {
            test: {
              id: 'test',
              name: 'test',
              type: 'public',
              direct: false,
              placeholder: false,
              anchorMoments: [],
              moments: [],
              scrollPosition: 0,
              sawLastMomentAt: 1546896104521,
              participants: [],
            },
          },
          panes: {
            primary: {
              type: 'EVENT',
              content: {
                channelId: 'test',
              },
            },
          },
        },
        user: {
          ...defaultState.user,
          mutedUsers: ['blockme'],
        },
      },
      receiveMuteUser('blockme'));

    expect(result).toEqual(
      {
        ...defaultState,
        feed: {
          ...defaultState.feed,
          channels: {
            test: {
              id: 'test',
              name: 'test',
              type: 'public',
              direct: false,
              placeholder: false,
              anchorMoments: [],
              moments: [],
              scrollPosition: 0,
              sawLastMomentAt: 1546896104521,
              participants: [],
            },
          },
          panes: {
            primary: {
              type: 'EVENT',
              content: {
                channelId: 'test',
              },
            },
          },
        },
        user: {
          ...defaultState.user,
          mutedUsers: [
            'blockme',
          ],
        },
      }
    );
  });
});
