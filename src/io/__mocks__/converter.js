const mock = {
  config: jest.fn(),
  cwcMessageToLegacyNewMessage: jest.fn().mockImplementation(value => value),
  legacyNewMessageToCwcMessage: jest.fn().mockImplementation(value => value),
};

export default mock;