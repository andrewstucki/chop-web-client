const GitRevisionPlugin = require('git-revision-webpack-plugin');

module.exports = {
  BUGSNAG: {
    apiKey: '2403ac729529750d296e1e4ee022f7dc',
    appVersion: require("../package.json").version,
    sourceControl: {
      provider: 'gitlab-onpremise',
      repository: 'https://in.thewardro.be/io/opennetwork/chop-web-client',
      revision: new GitRevisionPlugin().commithash()
    },
    autoAssignRelease: true
  }
};