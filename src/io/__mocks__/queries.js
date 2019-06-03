import testData from '../../../test/unit/io/test-data.json';

const setAccessToken = jest.fn();
const authenticate = jest.fn().mockResolvedValue(
  {
    authenticate: {
      accessToken: '1234567890',
      refreshToken: '0987654321',
    },
  }
);
const currentState = jest.fn().mockResolvedValue(testData);
const acceptPrayer = jest.fn().mockResolvedValue(
  {
    acceptPrayer: {
      name: 'Direct',
      id: '12345',
      type: 'direct',
      direct: true,
      subscribers: [
        {
          id: '123',
          avatar: null,
          nickname: 'James T. Kirk',
        },
        {
          id: '456',
          avatar: null,
          nickname: 'Will Brown',
        },
      ],
    },
  },
);
const muteSubscriber = jest.fn().mockResolvedValue({muteSubscriber: true});
const leaveChannel = jest.fn().mockResolvedValue({leaveFeed: true});
const directChat = jest.fn().mockResolvedValue(
  {
    createDirectChannel: {
      direct: true,
      id: '67890',
      type: 'direct',
      name: null,
      subscribers: [
        {
          id: '123',
          nickname: 'Fred',
          avatar: null,
        },
        {
          id: '456',
          nickname: 'Barny',
          avatar: null,
        },
      ],
    },
  }
);

const joinChannel = jest.fn().mockResolvedValue(
  {
    joinFeed: {
      direct: true,
      id: '67890',
      type: 'direct',
      name: null,
      subscribers: [
        {
          id: '123',
          nickname: 'Kilo',
          avatar: null,
        },
        {
          id: '456',
          nickname: 'Darth',
          avatar: null,
        },
      ],
    },
  }
);

const eventAtTime = jest.fn();
const getSchedule = jest.fn();
const sequence = jest.fn().mockResolvedValue(
  {
    sequence: {
      serverTime: 1539966236,
      steps: [
        {
          fetchTime: 1542289491,
          query: ['feed'],
          transitionTime: 1542289492,
        },
        {
          fetchTime: 1542289493,
          query: ['event', 'video'],
          transitionTime: 1542289494,
        },
        {
          fetchTime: 1542289495,
          query: ['event', 'video', 'feed'],
          transitionTime: 1542289496,
        },
      ],
    },
  }
);

const updateSubscriber = jest.fn().mockResolvedValue(
  {
    updateSubscriber: {
      id: '128',
      nickname: 'Joe',
      avatar: null,
      pubnubAccessKey: '1234',
      role: {
        label: '',
        permissions: [],
      },
      preferences: {
        textMode: 'COMFORTABLE',
      },
    },
  }
);

const mockQueries = {
  authenticate: authenticate,
  authenticateByLegacyToken: authenticate,
  authenticateByBasicAuth: authenticate,
  authenticateByRefreshToken: authenticate,
  currentState: currentState,
  acceptPrayer: acceptPrayer,
  muteSubscriber: muteSubscriber,
  leaveChannel: leaveChannel,
  directChat: directChat,
  eventAtTime: eventAtTime,
  schedule: getSchedule,
  sequence: sequence,
  joinChannel: joinChannel,
  updateSubscriber: updateSubscriber,
};

export {
  authenticate,
  currentState,
  acceptPrayer,
  muteSubscriber,
  leaveChannel,
  directChat,
  eventAtTime,
  getSchedule,
  sequence,
  setAccessToken,
  joinChannel,
  updateSubscriber,
};
export default mockQueries;
