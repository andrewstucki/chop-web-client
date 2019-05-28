// @flow
import ChatActor from '../../src/io/chat';
import { mockRequest } from 'graphql-request';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { defaultState } from '../../src/feed/dux';
import testData from './io/test-data.json';
import accessToken from './io/access-token.json';
import { __messageEvent } from 'pubnub';
import { mockDate } from '../testUtils';

jest.mock('../../src/io/location');
jest.mock('graphql-request');
jest.mock('../../src/io/queries');
jest.mock('pubnub');

Enzyme.configure({ adapter: new Adapter() });

describe('Test leave channel', () => {
  mockDate('Wed Jun 27 2018 16:53:06 GMT-0000');
  const message = {
    channelToken: 'test',
    messageText: 'Tony Hoare has left the chat',
    userId: 'abc123xyz',
    fromNickname: 'Tony Hoare',
    type: 'system',
    roomType: 'public',
    timestamp: '2018-06-27 16:53:6 +0000',
  };
  global.document.cookie  = 'legacy_token=12345; ';
  mockRequest.mockResolvedValueOnce(accessToken);
  mockRequest.mockResolvedValueOnce(testData);

  test('Receive leave channel and publish notification', () => {
    const store = {
      ...defaultState,
      currentUser: {
        id: 12234,
        pubnubToken: '54353',
        pubnubAccessKey: '09876',
        avatar: null,
        name: 'Shaq O.',
        role: {
          label: '',
          permissions: [],
        },
        preferences: {
          textMode: 'COMPACT',
        },
      },
      organization: {
        id: 2,
        name: 'Life.Church',
        logoUrl: '',
        theme: {
          headerBackgroundColor: '',
          headerMenuIconColor: '',
        },
      },
      pubnubKeys: {
        publish: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
        subscribe: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
      },
      channels: {
        ...defaultState.channels,
        test: {
          name: 'test',
          id: 'test',
          direct: false,
          moments: [],
          anchorMoments: [],
          participants: [
            {
              id: 12345,
              pubnubToken: 'abc123xyz',
              avatar: null,
              name: 'Tony Hoare',
              role: { label: '' },
            },
            {
              id: 12345,
              pubnubToken: '54353',
              avatar: null,
              name: 'Shaq O.',
              role: { label: '' },
            },
          ],
          scrollPosition: 0,
          sawLastMomentAt: 1546896104521,
        },
      },
    };

    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(store);

    const chat = new ChatActor(dispatch, getState);

    chat.init();

    __messageEvent(
      {
        channel: 'test',
        message: {
          action: 'newMessage',
          channel: 'test',
          data: message,
        },
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0]).toEqual(
      {
        channel: 'test',
        moment: {
          id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
          name: 'Tony Hoare',
          notificationType: 'LEFT_CHANNEL',
          timestamp: expect.stringMatching(/^(\d{1,2}):(\d{2})(\s*[ap]m?)$/i),
          type: 'NOTIFICATION',
        },
        type: 'RECEIVE_MOMENT',
      }
    );
  });
});
