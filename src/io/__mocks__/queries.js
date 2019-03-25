import testData from '../../../test/unit/io/test-data.json';
import authData from '../../../test/unit/io/access-token.json';

const authenticate = jest.fn().mockResolvedValue(authData);
const currentState = jest.fn().mockResolvedValue(testData);
const acceptPrayer = jest.fn().mockResolvedValue({acceptPrayer: true});
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
  authenticatedByRefreshToken: authenticate,
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
};
export default mockQueries;
