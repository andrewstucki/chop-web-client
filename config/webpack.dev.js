const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development'),
      GATEWAY_HOST: JSON.stringify('https://staging.chopapi.com/graphql'),
      GTM: {
        gtmId: JSON.stringify('GTM-XXXXXXX'),
        auth: JSON.stringify('XXXXXXXXXXXXXXXXXX'),
        preview: JSON.stringify('env-X')
      }
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    allowedHosts: [
      '.local',
    ],
    contentBase: './dist'
  }
});