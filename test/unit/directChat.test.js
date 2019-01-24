import {
  directChat,
} from '../../src/moment/message/dux';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import reducer from '../../src/chop/dux';
import actorMiddleware from '../../src/middleware/actor-middleware';
import ServiceActor from '../../src/io/serviceActor';
import { mockDirectChat } from '../../src/io/graphQL';
import { defaultState } from '../../src/feed/dux';
import { promisifyMiddleware } from '../testUtils';

jest.mock('../../src/io/graphQL');

describe('Direct Chat Tests', () => {
  test('Direct chat calls server', () => {
    const actors = actorMiddleware(
      ServiceActor
    );

    const middlewareList = [promisifyMiddleware, actors];
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
          channels: {
            abc: {
              id: 'abc',
              name: 'abc',
              moments: [],
              anchorMoments: [],
            },
          },
          panes: {
            primary: {
              active: {
                type: 'EVENT',
                content: {
                  channelId: 'abc',
                },
              },
            },
          },
        },
      },
      applyMiddleware(...middlewareList)
    );

    return store.dispatch(directChat(123456, 'abc')).then(() => {
      setTimeout(() => {
        expect(mockDirectChat).toHaveBeenCalledTimes(1);
        expect(mockDirectChat).toHaveBeenCalledWith(123456, 'abc');

        expect(store.getState().feed).toEqual(
          {
            ...defaultState,
            panes: {
              primary: {
                active: {
                  type: 'CHAT',
                  content: {
                    channelId: '67890',
                  },
                },
              },
            },
            channels: {
              abc: {
                id: 'abc',
                name: 'abc',
                moments: [],
                anchorMoments: [],
              },
              '67890': {
                id: '67890',
                name: null,
                moments: [],
                anchorMoments: [],
                participants: [
                  {
                    pubnubToken: 4321,
                    name: 'Fred',
                    avatarUrl: null,
                  },
                  {
                    pubnubToken: 5432,
                    name: 'Barny',
                    avatarUrl: null,
                  },
                ],
              },
            },
          }
        );
      }, 1000);
    });
  });
});

