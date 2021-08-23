/* eslint-disable no-undef */
const webpack = require('webpack')
const dotenv = require('dotenv')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const RemarkHTML = require('remark-html')

// create object envKeys to use env variables in code
const env = dotenv.config().parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'remark-loader',
            options: {
              remarkOptions: {
                plugins: [RemarkHTML]
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '*', '.js', '.jsx', '.scss', '.css' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'kanban',
      template: './src/index.html'
    }),
    new webpack.DefinePlugin(envKeys)
  ]
}