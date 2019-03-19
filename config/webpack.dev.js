const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development'),
      GATEWAY_HOST: JSON.stringify('https://staging.chopapi.com/graphql'),
      //GATEWAY_HOST: JSON.stringify('http://localhost:3000/graphql'),
      GTM: {
        gtmId: JSON.stringify('GTM-XXXXXXX'),
        auth: JSON.stringify('XXXXXXXXXXXXXXXXXX'),
        preview: JSON.stringify('env-X')
      },
      ROUTE_BASENAME: JSON.stringify('/')
    }),
    //new BundleAnalyzerPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    allowedHosts: [
      '.local',
    ],
    contentBase: './dist',
    historyApiFallback: true,
    compress: true,
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
});
