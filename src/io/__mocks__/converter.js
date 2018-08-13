const mock = {
  config: jest.fn(),
  cwcToLegacy: jest.fn().mockImplementation(value => value),
};

export default mock;