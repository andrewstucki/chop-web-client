const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

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
      ROUTE_BASENAME: JSON.stringify('/'),
      CWC_PATH: JSON.stringify('/')
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  devtool: 'inline-source-map',
  output: {
    publicPath: '/'
  }
});
