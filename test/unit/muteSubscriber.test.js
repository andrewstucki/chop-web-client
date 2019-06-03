// @flow
import { receiveMuteSubscriber } from '../../src/subscriber/dux';
import reducer, { defaultState} from '../../src/chop/dux';

describe('Mute Subscriber tests', () => {
  test('Subscriber is added when a mute message is received.', () => {
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
              subscribers: [],
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
      receiveMuteSubscriber('blockme'));

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
              subscribers: [],
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
        subscriber: {
          ...defaultState.subscriber,
          mutedSubscribers: [
            'blockme',
          ],
        },
      }
    );
  });

  test('Duplicate subscribers are not added.', () => {
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
              subscribers: [],
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
        subscriber: {
          ...defaultState.subscriber,
          mutedSubscribers: ['blockme'],
        },
      },
      receiveMuteSubscriber('blockme'));

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
              subscribers: [],
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
        subscriber: {
          ...defaultState.subscriber,
          mutedSubscribers: [
            'blockme',
          ],
        },
      }
    );
  });
});
