const mockHostname = jest.fn().mockReturnValue('digerati.churchonline.org');

const mock = jest.fn().mockImplementation(() => (
  {
    hostname: mockHostname,
  }
));

export {
  mockHostname,
};

export default mock;