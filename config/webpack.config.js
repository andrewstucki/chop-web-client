const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const constants = require('./webpack.constants.js');
const { BugsnagBuildReporterPlugin } = require('webpack-bugsnag-plugins');

module.exports = env => merge(common, {
  mode: env.WEBPACK_MODE,
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(env.ENV),
      BABEL_ENV: JSON.stringify(env.WEBPACK_MODE),
      GATEWAY_HOST: JSON.stringify(env.GATEWAY_HOST),
      GTM: {
        gtmId: JSON.stringify(env.GTM_GTMID),
        auth: JSON.stringify(env.GTM_AUTH),
        preview: JSON.stringify(env.GTM_PREVIEW)
      },
      PUBLIC_PATH: JSON.stringify(env.PUBLIC_PATH),
      METRICS_HOST: JSON.stringify(env.METRICS_HOST)
    }),
    new BugsnagBuildReporterPlugin({
      ...constants.BUGSNAG,
      releaseStage: env.ENV,
    })
  ],
  devtool: 'source-map',
  output: {
    publicPath: env.PUBLIC_PATH
  }
});
