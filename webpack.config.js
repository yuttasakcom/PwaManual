const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')
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
        new workboxPlugin({
            globPatterns: ['**/*.{html,js,css}'],
            swDest: path.join(DIST_DIR, 'sw.js'),
        })
    ]
}