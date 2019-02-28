import { mockDate, promisifyMiddleware } from '../../testUtils';
import data from '../../mockData/scheduleTestData.json';
import actorMiddleware from '../../../src/middleware/actor-middleware';
import { createStore, applyMiddleware } from 'redux';
import serviceActor from '../../../src/io/serviceActor';
import {
  mockAuthenticate,
  mockCurrentState,
  mockEventAtTime,
  mockGetSequence,
} from '../../../src/io/graphQL';
import reducer from '../../../src/chop/dux';
import { defaultState } from '../../../src/feed/dux';
import { REHYDRATE } from 'redux-persist/lib/constants';

jest.mock('../../../src/io/graphQL');

let time = 1542322000000;
const fastForwardTime = seconds => {
  time += seconds * 1000;
  mockDate(time);
  jest.advanceTimersByTime(seconds * 1000);
};

describe('Service Run through', () => {
  test.skip('Joining before service starts', async () => {
    jest.useFakeTimers();
    mockDate(time);

    global.document.cookie  = data.cookie;
    mockAuthenticate.mockResolvedValue(data.authenticate);
    mockCurrentState.mockResolvedValue(data.currentState);
    mockGetSequence.mockResolvedValueOnce(data.sequenceNum1);
    mockEventAtTime.mockResolvedValueOnce(data.eventAtNum1);
    mockEventAtTime.mockResolvedValueOnce(data.eventAtNum2);
    mockEventAtTime.mockResolvedValue(data.eventAtNum3);
    mockGetSequence.mockResolvedValueOnce(data.sequenceNum2);

    const actors = actorMiddleware(serviceActor);
    const middlewareList = [promisifyMiddleware, actors];
    const store = createStore(
      reducer,
      applyMiddleware(...middlewareList)
    );

    return store.dispatch({type: REHYDRATE}).then( async () => {
      expect(store.getState().feed).toEqual(
        {
          ...defaultState,
          ...phase1,
        }
      );

      await true; // an expression is required for the await statement

      expect(store.getState().feed).toEqual(
        {
          ...defaultState,
          ...phase1,
          ...phase2,
        }
      );

      fastForwardTime(73);
      await fastForwardTime(1);

      expect(store.getState().feed).toEqual(
        {
          ...defaultState,
          ...phase1,
          ...phase3,
        }
      );

      fastForwardTime(125);
      await fastForwardTime(1);

      expect(store.getState().feed).toEqual(
        {
          ...defaultState,
          ...phase1,
          ...phase4,
        }
      );

      fastForwardTime(233);
      await fastForwardTime(1);

      expect(store.getState().feed).toEqual(
        {
          ...defaultState,
          ...phase1,
          ...phase4,
          ...phase5,
        }
      );

      fastForwardTime(65);
      await fastForwardTime(1);

      expect(store.getState().feed).toEqual(
        {
          ...defaultState,
          ...phase1,
          ...phase4,
          sequence: {
            serverTime: 1542322000,
            steps: [
              {
                fetchTime: 1542323594,
                queries: [
                  'event',
                  'video',
                  'feeds',
                ],
                transitionTime: 1542323700,
              },
            ],
          },
          video: {
            type: 'simulated',
            url: 'https://www.youtube.com/embed/M9SLpXu5Xik',
          },
        }
      );

      fastForwardTime(1093);
      await fastForwardTime(1);

      expect(store.getState().feed).toEqual(
        {
          ...defaultState,
          ...phase1,
          ...phase4,
          sequence: {
            serverTime: 1542322000,
            steps: [
              {
                fetchTime: 1542323594,
                queries: [
                  'event',
                  'video',
                  'feeds',
                ],
                transitionTime: 1542323700,
                data: {
                  eventAt: {
                    description: null,
                    duration: null,
                    endTime: null,
                    eventTime: {
                      id: null,
                    },
                    feeds: [],
                    id: null,
                    sequence: {
                      serverTime: 1542321767,
                      steps: [],
                    },
                    speaker: null,
                    startTime: null,
                    title: null,
                    video: null,
                    videoType: null,
                  },
                },
              },
            ],
          },
          video: {
            type: 'simulated',
            url: 'https://www.youtube.com/embed/M9SLpXu5Xik',
          },
        }
      );

      fastForwardTime(105);
      await await fastForwardTime(1);

      expect(store.getState().feed).toEqual(
        {
          ...defaultState,
          ...phase1,
          schedule: [],
          sequence: {
            serverTime: 1542323244,
            steps: [
              {
                fetchTime: 1542323864,
                queries: [
                  'feeds',
                  'event',
                ],
                transitionTime: 1542324000,
              },
              {
                fetchTime: 1542324218,
                queries: [
                  'video',
                ],
                transitionTime: 1542324300,
              },
              {
                fetchTime: 1542325455,
                queries: [
                  'event',
                  'video',
                  'feeds',
                ],
                transitionTime: 1542325500,
              },
            ],
          },
        }
      );
    });
  });
});

const phase1 = {
  currentUser: {
    avatar: undefined,
    id: 1014574,
    name: 'Scott H',
    pubnubAccessKey: undefined,
    pubnubToken: null,
    role: {
      label: 'Host',
      permissions: [],
    },
  },
  organization: {
    id: 28116,
    name: 'Grace Bible Church',
  },
  pubnubKeys: {
    publish: 'pub-c-5d166bf0-07cf-4e5b-81e6-797b7f01bf83',
    subscribe: 'sub-c-12f3b1fe-e04d-11e7-b7e7-02872c090099',
  },
  schedule: [
    {
      endTime: 1542325500,
      fetchTime: 1542323905,
      id: '132487',
      scheduleTime: 1542324600,
      startTime: 1542324000,
      title: 'Church Service',
    },
  ],
};

const phase2 = {
  sequence: {
    serverTime: 1542322000,
    steps: [
      {
        fetchTime: 1542322074,
        queries: [
          'feeds',
          'event',
        ],
        transitionTime: 1542322200,
      },
      {
        fetchTime: 1542322434,
        queries: [
          'video',
        ],
        transitionTime: 1542322500,
      },
      {
        fetchTime: 1542323594,
        queries: [
          'event',
          'video',
          'feeds',
        ],
        transitionTime: 1542323700,
      },
    ],
  },
};

const phase3 = {
  sequence: {
    serverTime: 1542322000,
    steps: [
      {
        fetchTime: 1542322074,
        queries: [
          'feeds',
          'event',
        ],
        transitionTime: 1542322200,
        data: {
          eventAt: {
            description: '',
            duration: 15,
            endTime: 1542323700,
            eventTime: {
              id: '357468',
            },
            feeds: [
              {
                direct: false,
                id: '5fd7123ee2ff4432cafbac4331b643a65839b941ef19e4b60b7f8973e13511ff',
                name: 'Public',
                type: 'public',
              },
              {
                direct: false,
                id: '98aeacf6bb5acaeb343ee467f0366ac1617b3452d5d56b246c0c261d1b52d483',
                name: 'Legacy',
                type: 'legacy',
              },
              {
                direct: false,
                id: '27644bb96278163e92e6ac5f74dcaaa0a11cd7cd3cba78a3f12f622ed76f7464',
                name: 'Host',
                type: 'host',
              },
            ],
            id: '132487',
            speaker: '',
            startTime: 1542322200,
            title: 'Church Service',
            videoType: 'simulated',
          },
        },
      },
      {
        fetchTime: 1542322434,
        queries: [
          'video',
        ],
        transitionTime: 1542322500,
      },
      {
        fetchTime: 1542323594,
        queries: [
          'event',
          'video',
          'feeds',
        ],
        transitionTime: 1542323700,
      },
    ],
  },
};

const phase4 = {
  channels: {
    '27644bb96278163e92e6ac5f74dcaaa0a11cd7cd3cba78a3f12f622ed76f7464': {
      id: '27644bb96278163e92e6ac5f74dcaaa0a11cd7cd3cba78a3f12f622ed76f7464',
      moments: [],
      anchorMoments: [],
      name: 'Host',
      participants: [],
    },
    '5fd7123ee2ff4432cafbac4331b643a65839b941ef19e4b60b7f8973e13511ff': {
      id: '5fd7123ee2ff4432cafbac4331b643a65839b941ef19e4b60b7f8973e13511ff',
      moments: [],
      anchorMoments: [],
      name: 'Public',
      participants: [],
    },
    '98aeacf6bb5acaeb343ee467f0366ac1617b3452d5d56b246c0c261d1b52d483': {
      id: '98aeacf6bb5acaeb343ee467f0366ac1617b3452d5d56b246c0c261d1b52d483',
      moments: [],
      anchorMoments: [],
      name: 'Legacy',
      participants: [],
    },
  },
  event: {
    id: '132487',
    startTime: 1542322200,
    title: 'Church Service',
  },
  panes: {
    primary: {
      type: 'EVENT',
      content: {
        channelId: '5fd7123ee2ff4432cafbac4331b643a65839b941ef19e4b60b7f8973e13511ff',
      },
    },
  },
  sequence: {
    serverTime: 1542322000,
    steps: [
      {
        fetchTime: 1542322434,
        queries: [
          'video',
        ],
        transitionTime: 1542322500,
      },
      {
        fetchTime: 1542323594,
        queries: [
          'event',
          'video',
          'feeds',
        ],
        transitionTime: 1542323700,
      },
    ],
  },
};

const phase5 = {
  sequence: {
    serverTime: 1542322000,
    steps: [
      {
        feed: {
          ...defaultState,
          appendingMessage: true,
          event: {
            title: 'Fake Event',
            id: 334494,
            startTime: 1531864800,
          },
          sequence: {
            serverTime: 1539966236,
            steps: [
              {
                data: '{ "data": {            "currentVideo": {              "type": "StandardEmbed",              "url": "https://www.youtube.com/embed/uw_JA75to30"            }          } }',
                timestamp: 1539966238,
              },
              {
                data: '{ "data": {            "currentFeeds": [{              "id": "26a7b967c49cff813f5449271c8a1158bb430a09bf6db5847f88abf301ea9cb1",              "name": "Personal",              "type": "personal"            }],            "currentVideo": {              "type": "",              "url": ""            }          } }',
                timestamp: 1539966239,
              },
            ],
          },
          pubnubKeys: {
            publish: 'pub-9b402341-30c2-459f-9bed-69fd684a5e00',
            subscribe: 'sub-5ef6daa3-9490-11e1-bef7-45383605a8b5',
          },
          channels: {
            '1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c': {
              id: '1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c',
              moments: [],
              anchorMoments: [],
              name: 'Public',
              participants: [],
            },
            '26a7b967c49cff813f5449271c8a1158bb430a09bf6db5847f88abf301ea9cb1': {
              id: '26a7b967c49cff813f5449271c8a1158bb430a09bf6db5847f88abf301ea9cb1',
              moments: [],
              anchorMoments: [],
              name: 'Personal',
              participants: [],
            },
            '4944bf368d26faf882940ee0811964cd357a37ccf468cd8ccdf25b95b0b52a28': {
              id: '4944bf368d26faf882940ee0811964cd357a37ccf468cd8ccdf25b95b0b52a28',
              moments: [],
              anchorMoments: [],
              name: 'Legacy',
              participants: [],
            },
            a70c52181da2f13f1f8313894c6125e2cdb87f1844fc785fb87988bc4725f2bc: {
              id: 'a70c52181da2f13f1f8313894c6125e2cdb87f1844fc785fb87988bc4725f2bc',
              moments: [],
              anchorMoments: [],
              name: 'Host',
              participants: [],
            },
          },
        },
        fetchTime: 1542322434,
        queries: [
          'video',
        ],
        transitionTime: 1542322500,
        data: {
          eventAt: {
            description: '',
            duration: 15,
            endTime: 1542323700,
            eventTime: {
              id: '357468',
            },
            id: '132487',
            speaker: '',
            startTime: 1542322200,
            title: 'Church Service',
            video: {
              type: 'simulated',
              url: 'https://www.youtube.com/embed/M9SLpXu5Xik',
            },
            videoType: 'simulated',
          },
        },
      },
      {
        fetchTime: 1542323594,
        queries: [
          'event',
          'video',
          'feeds',
        ],
        transitionTime: 1542323700,
      },
    ],
  },
};
