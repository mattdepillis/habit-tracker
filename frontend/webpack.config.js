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
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
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
      }
    ]
  },
  resolve: {
    extensions: [ '*', '.js', '.jsx' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'kanban',
      template: './src/index.html'
    }),
    new webpack.DefinePlugin(envKeys)
  ],
  mode: 'development'
}