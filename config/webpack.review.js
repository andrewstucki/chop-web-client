const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('staging'),
      BABEL_ENV: JSON.stringify('staging'),
      GATEWAY_HOST: JSON.stringify('https://staging.chopapi.com/graphql'),
      GTM: {
        gtmId: JSON.stringify('GTM-MQMRR25'),
        auth: JSON.stringify('I28B6zHKm1IufUQpkVRF_w'),
        preview: JSON.stringify('env-5')
      },
      ROUTE_BASENAME: JSON.stringify('/')
    }),
    new CompressionPlugin(),
    new CopyWebpackPlugin([
      { from: 'assets/manifest.webmanifest', to: 'manifest.webmanifest' },
    ]),
    new webpack.HashedModuleIdsPlugin(),
  ],
  devtool: 'inline-source-map',
  output: {
    publicPath: '/'
  }
});
