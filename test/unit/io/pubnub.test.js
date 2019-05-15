// @flow
import { mockPublish } from 'pubnub';
import { runSaga } from 'redux-saga';
import { publishMomentToChannel } from '../../../src/io/saga';
import { publishLeftChannelNotification, publishMessage } from '../../../src/moment';
import { publishMuteUserNotification } from '../../../src/moment/notification/dux';
import { defaultState } from '../../../src/chop/dux';
import PubnubClient from '../../../src/io/pubnubClient';
import queries from '../../../src/io/queries';
import { mockDate } from '../../testUtils';

jest.mock('pubnub');
jest.mock('../../../src/io/converter');
jest.mock('../../../src/io/queries');
const mock = (mockFn: any) => mockFn;

describe('Pubnub saga', () => {
  beforeAll(() => {
    PubnubClient.config({
      publishKey: 'publish',
      subscribeKey: 'subscribe',
      authKey: 'auth',
      uuid: 'uuid',
    });
  });

  beforeEach(() => {
    mockPublish.mockReset();
  });

  test('Publish Message', async () => {
    const sender = {
      pubnubToken: '098765',
      name: 'Han Solo',
      role: {
        label: '',
      },
    };

    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => ({
        ...defaultState,
        feed: {
          ...defaultState.feed,
          channels: {
            public: {
              id: 'public',
              name: 'public',
              direct: false,
              placeholder: false,
              moments: [],
              anchorMoments: [],
              scrollPosition: 0,
              sawLastMomentAt: 1546896104521,
              participants: [],
            },
          },
        },
      }),
    },
    publishMomentToChannel,
    publishMessage('public', `It's not my fault.`, sender, 'en')).toPromise();

    expect(mockPublish).toHaveBeenCalledTimes(1);
    expect(mockPublish.mock.calls[0][0]).toMatchObject(
      {
        channel: 'public',
        message: {
          action: 'newMessage',
          channel: 'public',
          data: {
            type: 'MESSAGE',
            id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
            lang: 'en',
            text: `It's not my fault.`,
            sender,
            messageTrayOpen: false,
            isMuted: false,
          },
        },
      }
    );
  });

  test('Publish accepted prayer request', async () => {
    const dispatched = [];
    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => ({
        ...defaultState,
        feed: {
          ...defaultState.feed,
          channels: {
            host: {
              id: 'host',
              name: 'host',
              direct: false,
              placeholder: false,
              moments: [],
              anchorMoments: [],
              scrollPosition: 0,
              sawLastMomentAt: 1546896104521,
              participants: [],
            },
          },
        },
      }),
    },
    publishMomentToChannel,
    publishLeftChannelNotification(
      'Darth Maul',
      '12345',
      'host',
      1546896104521)).toPromise();

    expect(mockPublish).toHaveBeenCalledTimes(1);
  });

  test('Publish muteUser', async () => {
    const dispatched = [];
    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => ({
        ...defaultState,
        feed: {
          ...defaultState.feed,
          channels: {
            host: {
              id: 'host',
              name: 'host',
              direct: false,
              placeholder: false,
              moments: [],
              anchorMoments: [],
              scrollPosition: 0,
              sawLastMomentAt: 1546896104521,
              participants: [],
            },
          },
        },
      }),
    },
    publishMomentToChannel,
    publishMuteUserNotification(
      'host',
      'guest',
      'host',
      new Date().getTime().toString(),
    )).toPromise();

    expect(mockPublish).toHaveBeenCalledTimes(1);
  });

  test('Publish system message', async () => {
    const dispatched = [];
    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => ({
        ...defaultState,
        feed: {
          ...defaultState.feed,
          channels: {
            host: {
              id: 'host',
              name: 'host',
              direct: false,
              placeholder: false,
              moments: [],
              anchorMoments: [],
              scrollPosition: 0,
              sawLastMomentAt: 1546896104521,
              participants: [],
            },
          },
        },
      }),
    },
    publishMomentToChannel,
    publishMuteUserNotification(
      'host',
      'guest',
      'host',
      new Date().getTime().toString(),
    )).toPromise();

    expect(mockPublish).toHaveBeenCalledTimes(1);
  });

  test('Publish Message to placeholder channel', async () => {
    mock(queries.directChat);
    mockDate(1553266446136);
    const sender = {
      pubnubToken: '098765',
      name: 'Han Solo',
      role: {
        label: '',
      },
    };

    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => ({
        ...defaultState,
        feed: {
          ...defaultState.feed,
          channels: {
            placeholder: {
              id: 'placeholder',
              name: 'placeholder',
              direct: false,
              placeholder: true,
              moments: [],
              anchorMoments: [],
              scrollPosition: 0,
              sawLastMomentAt: 1546896104521,
              participants: [
                {
                  id: 12345,
                  pubnubToken: '12345',
                  avatar: null,
                  name: 'Kilo Ren',
                  role: {
                    label: '',
                  },
                },
              ],
            },
          },
        },
      }),
    },
    publishMomentToChannel,
    publishMessage('placeholder', `It's not my fault.`, sender, 'en')).toPromise();

    expect(dispatched.length).toEqual(5);
    expect(dispatched).toMatchObject([
      {
        type: 'ADD_CHANNEL',
        channel: {
          id: '67890',
          name: null,
          direct: true,
          placeholder: false,
          moments: [],
          participants: [
            {
              id: '123',
              name: 'Fred',
              pubnubToken: '4321',
              avatar: null,
              role: {
                label: '',
              },
            },
            {
              id: '456',
              name: 'Barny',
              pubnubToken: '5432',
              avatar: null,
              role: {
                label: '',
              },
            },
          ],
          anchorMoments: [],
          scrollPosition: 0,
          sawLastMomentAt: 1553266446136,
        },
      },
      {
        type: 'SET_PANE_CONTENT',
        name: 'primary',
        pane: {
          type: 'CHAT',
          content: {
            channelId: '67890',
          },
        },
      },
      {
        type: 'REMOVE_CHANNEL',
        channel: 'placeholder',
      },
      {
        type: 'SET_PANE_CONTENT',
        name: 'primary',
        pane: {
          type: 'CHAT',
          content: {
            channelId: '67890',
          },
        },
      },
      {
        type: 'ADD_MOMENT_TO_CHANNEL',
        channel: '67890',
        moment: {
          type: 'MESSAGE',
          id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
          timestamp: 1553266446136,
          lang: 'en',
          text: `It's not my fault.`,
          sender: {
            pubnubToken: '098765',
            name: 'Han Solo',
            role: {
              label: '',
            },
          },
          messageTrayOpen: false,
          isMuted: false,
        },
      },
    ]);
    expect(mockPublish).toHaveBeenCalledTimes(1);
    expect(mockPublish.mock.calls[0][0]).toMatchObject(
      {
        channel: '67890',
        message: {
          action: 'newMessage',
          channel: '67890',
          data: {
            type: 'MESSAGE',
            id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
            lang: 'en',
            text: `It's not my fault.`,
            sender,
            messageTrayOpen: false,
            isMuted: false,
          },
        },
      }
    );
  });
});
