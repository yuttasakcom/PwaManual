const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DIST_DIR = 'dist'

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, DIST_DIR),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    new CopyWebpackPlugin([
      { from: 'sw.js', to: 'sw.js' },
      { from: 'workbox-sw.prod.v1.0.1.js', to: 'workbox-sw.prod.v1.0.1.js' },
      { from: 'statics', to: 'statics' },
    ])
  ]
}