const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const constants = require('./webpack.constants.js');
const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader?classPrefix',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            }
          }
        ]
      },
      {
        test: /\.(ogg|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'audio',
            }
          }
        ]
      }      
    ]
  },
  resolve: {
    extensions: [ '.jsx', '.js', '.css' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './assets/index.html'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CompressionPlugin(),
    new CopyWebpackPlugin([
      { from: 'assets/manifest.webmanifest', to: 'manifest.webmanifest' },
      { from: 'locales', to: 'locales' }
    ]),
    new BugsnagSourceMapUploaderPlugin({...constants.BUGSNAG, overwrite: true}),
  ],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    minimizer: [new TerserPlugin({
      parallel: true,
      sourceMap: true
    })],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
  },

};
