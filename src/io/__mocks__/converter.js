const mock = {
  config: jest.fn(),
  cwcMessageToLegacyNewMessage: jest.fn().mockImplementation(value => value),
  legacyNewMessageToCwcMessage: jest.fn().mockImplementation(value => value),
  cwcToLegacyLeaveChannel: jest.fn().mockImplementation(value => value),
  cwcToLegacyMuteUser: jest.fn().mockImplementation(value => value),
};

export default mock;
