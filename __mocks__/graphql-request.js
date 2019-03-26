const mockRequest = jest.fn().mockImplementation((query, _variables) => {
  if (query.includes('AccessToken')) {
    return {
      authenticate: {
        accessToken: '12345',
      },
    };
  } else {
    return {};
  }
});

const GraphQLClient = jest.fn().mockImplementation(() => (
  {
    request: mockRequest,
  }
));

export {
  GraphQLClient,
  mockRequest,
};