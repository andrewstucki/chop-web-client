import testData from '../../../test/unit/io/test-data.json';
import authData from '../../../test/unit/io/access-token.json';

const mockAuthenticate = jest.fn().mockResolvedValue(authData);
const mockCurrentState = jest.fn().mockResolvedValue(testData);
const mockAcceptPrayer = jest.fn().mockResolvedValue({acceptPrayer: true});
const mockMuteUser = jest.fn().mockResolvedValue({muteUser: true});
const mockLeaveChannel = jest.fn().mockResolvedValue({leaveFeed: true});

const mockGraphQl = jest.fn().mockImplementation(() => (
  {
    authenticate: mockAuthenticate,
    currentState: mockCurrentState,
    acceptPrayer: mockAcceptPrayer,
    muteUser: mockMuteUser,
    leaveChannel: mockLeaveChannel,
  }
));

export {
  mockAuthenticate,
  mockCurrentState,
  mockAcceptPrayer,
  mockMuteUser,
  mockLeaveChannel,
};
export default mockGraphQl;
