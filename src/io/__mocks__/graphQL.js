import testData from '../../../test/unit/io/test-data.json';
import authData from '../../../test/unit/io/access-token.json';

const mockAuthenticate = jest.fn().mockResolvedValue(authData);
const mockCurrentState = jest.fn().mockResolvedValue(testData);
const mockAcceptPrayer = jest.fn().mockResolvedValue({acceptPrayer: true});
const mockMuteUser = jest.fn().mockResolvedValue({muteUser: true});
const mockLeaveChannel = jest.fn().mockResolvedValue({leaveFeed: true});
const mockDirectChat = jest.fn().mockResolvedValue(
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

const mockGraphQl = jest.fn().mockImplementation(() => (
  {
    authenticate: mockAuthenticate,
    currentState: mockCurrentState,
    acceptPrayer: mockAcceptPrayer,
    muteUser: mockMuteUser,
    leaveChannel: mockLeaveChannel,
    directChat: mockDirectChat,
  }
));

export {
  mockAuthenticate,
  mockCurrentState,
  mockAcceptPrayer,
  mockMuteUser,
  mockLeaveChannel,
  mockDirectChat,
};
export default mockGraphQl;
