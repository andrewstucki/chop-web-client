const ErrorBoundary = () => {};

const bugsnagClient = {
  use: (_plugin, _options) => {},
  getPlugin: _name => ErrorBoundary,
  notify: (_error, _options) => {},
};

export default _apiKeyOrOpts => bugsnagClient;