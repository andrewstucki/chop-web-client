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
      direct: true,
      participants: [
        {
          id: '123',
          avatar: null,
          name: 'James T. Kirk',
          pubnubToken: '67890',
        },
        {
          id: '456',
          avatar: null,
          name: 'Will Brown',
          pubnubToken: '54320',
        },
      ],
    },
  },
);
const muteUser = jest.fn().mockResolvedValue({muteUser: true});
const leaveChannel = jest.fn().mockResolvedValue({leaveFeed: true});
const directChat = jest.fn().mockResolvedValue(
  {
    createDirectFeed: {
      direct: true,
      id: '67890',
      name: null,
      participants: [
        {
          id: '123',
          pubnubToken: '4321',
          name: 'Fred',
          avatar: null,
        },
        {
          id: '456',
          pubnubToken: '5432',
          name: 'Barny',
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
      name: null,
      participants: [
        {
          id: '123',
          pubnubToken: '4321',
          name: 'Kilo',
          avatar: null,
        },
        {
          id: '456',
          pubnubToken: '5432',
          name: 'Darth',
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

const mockQueries = {
  authenticate: authenticate,
  authenticateByLegacyToken: authenticate,
  authenticateByBasicAuth: authenticate,
  authenticateByRefreshToken: authenticate,
  currentState: currentState,
  acceptPrayer: acceptPrayer,
  muteUser: muteUser,
  leaveChannel: leaveChannel,
  directChat: directChat,
  eventAtTime: eventAtTime,
  schedule: getSchedule,
  sequence: sequence,
  joinChannel: joinChannel,
};

export {
  authenticate,
  currentState,
  acceptPrayer,
  muteUser,
  leaveChannel,
  directChat,
  eventAtTime,
  getSchedule,
  sequence,
  setAccessToken,
  joinChannel,
};
export default mockQueries;
