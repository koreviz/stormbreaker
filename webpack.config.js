const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode:  isDevelopment ? 'development': 'production',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    inline: true,
    port: process.env.PORT || 3000,
    host: '0.0.0.0', // Change to '0.0.0.0' for external facing server
    historyApiFallback: true,
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'bundle.css'
  })],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')
                ]
              }
              
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};