const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
          'style-loader',
          { 
            loader: 'css-loader',
            options: { 
              module: true,
              importLoaders: 1 
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.jsx', '.js', '.css' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './assets/index.html'
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};