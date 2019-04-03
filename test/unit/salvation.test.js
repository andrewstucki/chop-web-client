// @flow
import { __messageEvent } from 'pubnub';
import { defaultState } from '../../src/feed/dux';
import Chat from '../../src/io/chat';
jest.mock('pubnub');

describe('Salvation Moment Tests', () => {
  test('Receive first salvation adds salvation anchor moment to feed', () => {
    const store = {
      ...defaultState,
      currentUser: {
        ...defaultState.currentUser,
        pubnubToken: '123456',
        pubnubAccessKey: '1533912921585',
      },
      event: {
        id: '320418',
        eventTimeId: '1920834',
        startTime: 1529425800000,
        endTime: 1529425900000,
        title: 'When Pigs Fly - Week 2',
        timezone: 'Central',
      },
      organization: {
        id: 2,
        name: 'Life.Church',
      },
      pubnubKeys: {
        publish: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
        subscribe: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
      },
      channels: {
        ...defaultState.channels,
        '123456': {
          name: 'public',
          id: '123456',
          direct: false,
          moments: [],
          anchorMoments: [],
          scrollPosition: 0,
          sawLastMomentAt: 1546896104521,
        },
      },
    };

    const dispatch = jest.fn();
    const getState = jest.fn();

    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState);

    chat.dispatch(
      {
        type: 'SET_PUBNUB_KEYS',
      }
    );

    __messageEvent(
      {
        channel: '123456',
        message: {
          action: 'pollVote',
          data: {
            slideId: '12345',
            slideKind: 'Salvation',
            count: 3,
          },
        },
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0]).toMatchObject(
      {
        type: 'SET_SALVATIONS',
        count: 3,
      }
    );
    expect(dispatch.mock.calls[1][0]).toMatchObject(
      {
        type: 'SET_ANCHOR_MOMENT',
        channel: '123456',
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          anchorMomentType: 'SALVATION',
          id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
          text: 'I commit my life to Christ.',
        },
      }
    );
  });

  test('Receive additional salvations increments the salvations, salvation is the anchorMoments', () => {
    const store = {
      ...defaultState,
      currentUser: {
        ...defaultState.currentUser,
        pubnubToken: '123456',
        pubnubAccessKey: '1533912921585',
      },
      event: {
        id: '320418',
        eventTimeId: '1920834',
        startTime: 1529425800000,
        endTime: 1529425900000,
        title: 'When Pigs Fly - Week 2',
        timezone: 'Central',
      },
      organization: {
        id: 2,
        name: 'Life.Church',
      },
      pubnubKeys: {
        publish: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
        subscribe: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
      },
      channels: {
        ...defaultState.channels,
        '123456': {
          name: 'public',
          id: '123456',
          direct: false,
          moments: [],
          anchorMoments: [
            {
              type: 'ANCHOR_MOMENT',
              anchorMomentType: 'SALVATION',
              id: '123456',
              text: 'I commit my life to Christ.',
            },
          ],
          scrollPosition: 0,
          sawLastMomentAt: 1546896104521,
        },
      },
      salvations: 3,
    };

    const dispatch = jest.fn();
    const getState = jest.fn();

    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState);

    chat.dispatch(
      {
        type: 'SET_PUBNUB_KEYS',
      }
    );

    __messageEvent(
      {
        channel: '123456',
        message: {
          action: 'pollVote',
          data: {
            slideId: '12345',
            slideKind: 'Salvation',
            count: 4,
          },
        },
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0]).toMatchObject(
      {
        type: 'SET_SALVATIONS',
        count: 4,
      }
    );
  });

  test('Receive additional salvations increments the salvations, salvation is in the moments', () => {
    const store = {
      ...defaultState,
      currentUser: {
        ...defaultState.currentUser,
        pubnubToken: '123456',
        pubnubAccessKey: '1533912921585',
      },
      event: {
        id: '320418',
        eventTimeId: '1920834',
        startTime: 1529425800000,
        endTime: 1529425900000,
        title: 'When Pigs Fly - Week 2',
        timezone: 'Central',
      },
      organization: {
        id: 2,
        name: 'Life.Church',
      },
      pubnubKeys: {
        publish: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
        subscribe: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
      },
      channels: {
        ...defaultState.channels,
        '123456': {
          name: 'public',
          id: '123456',
          direct: false,
          moments: [
            {
              type: 'ANCHOR_MOMENT',
              anchorMomentType: 'SALVATION',
              id: '123456',
              text: 'I commit my life to Christ.',
            },
          ],
          anchorMoments: [],
          scrollPosition: 0,
          sawLastMomentAt: 1546896104521,
        },
      },
      salvations: 3,
    };

    const dispatch = jest.fn();
    const getState = jest.fn();

    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState);

    chat.dispatch(
      {
        type: 'SET_PUBNUB_KEYS',
      }
    );

    __messageEvent(
      {
        channel: '123456',
        message: {
          action: 'pollVote',
          data: {
            slideId: '12345',
            slideKind: 'Salvation',
            count: 4,
          },
        },
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0]).toMatchObject(
      {
        type: 'SET_SALVATIONS',
        count: 4,
      }
    );
  });
});
