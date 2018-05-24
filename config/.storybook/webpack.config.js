const path = require("path");

module.exports = {
  module: {
    rules: [
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
          { 
            loader: 'postcss-loader', 
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          }
        ],
        include: path.resolve(__dirname, "../../")
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader?classPrefix',
      }
    ]
  }
};

