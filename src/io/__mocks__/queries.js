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
      subscribers: [
        {
          nickname: 'James T. Kirk',
          pubnubToken: '67890',
        },
        {
          nickname: 'Will Brown',
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
      subscribers: [
        {
          pubnubToken: 4321,
          nickname: 'Fred',
          avatar: null,
        },
        {
          pubnubToken: 5432,
          nickname: 'Barny',
          avatar: null,
        },
      ],
    },
  }
);
const eventAtTime = jest.fn();
const getSchedule = jest.fn();
const getSequence = jest.fn();

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
  sequence: getSequence,
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
  getSequence,
  setAccessToken,
};
export default mockQueries;
