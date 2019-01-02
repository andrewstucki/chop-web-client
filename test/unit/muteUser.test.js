// @flow
import { muteUser } from '../../src/moment/message/dux';
import reducer, { defaultState } from '../../src/feed/dux';

describe('Mute User tests', () => {
  test('User is added when a mute message is received.', () => {
    const result = reducer(
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
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'test',
          },
        },
      },
      muteUser('test', 'blockme'));

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
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'test',
          },
        },
        mutedUsers: [
          'blockme',
        ],
      }
    );
  });

  test('Duplicate users are not added.', () => {
    const result = reducer(
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
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'test',
          },
        },
        mutedUsers: ['blockme'],
      },
      muteUser('test', 'blockme'));

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
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            channelId: 'test',
          },
        },
        mutedUsers: [
          'blockme',
        ],
      }
    );
  });
});