const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const constants = require('./webpack.constants.js');
const { BugsnagBuildReporterPlugin } = require('webpack-bugsnag-plugins');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('staging'),
      GATEWAY_HOST: JSON.stringify('https://staging.chopapi.com/graphql'),
      GTM: {
        gtmId: JSON.stringify('GTM-MQMRR25'),
        auth: JSON.stringify('I28B6zHKm1IufUQpkVRF_w'),
        preview: JSON.stringify('env-5')
      },
      ROUTE_BASENAME: JSON.stringify('/host_mobile'),
      CWC_HOST: JSON.stringify('https://staging.churchonline.us')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new BugsnagBuildReporterPlugin({
      ...constants.BUGSNAG,
      releaseStage: 'staging',
    })
  ],
  devtool: 'inline-source-map',
  output: {
    publicPath: 'https://staging.churchonline.us/'
  }
});
