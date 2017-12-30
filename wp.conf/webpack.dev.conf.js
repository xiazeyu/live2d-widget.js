const webpack = require('webpack');
const path = require('path')
const visualizer = require('webpack-visualizer-plugin');
const manifestPlugin = require('webpack-manifest-plugin');
const nowDate = new Date();

module.exports = {
  entry: [
    './src/index.js',
  ],

  output: {
    filename: 'clL2D.min.js',
    chunkFilename: 'clL2D.[id].min.js',
    path: path.resolve(__dirname, '..', 'dev'),
  },

  devtool: "source-map",

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.BannerPlugin("___DEV___https://github.com/xiazeyu/live2d-widget.js~built@" + nowDate.toLocaleDateString() + " "+ nowDate.toLocaleTimeString()),
    /**
     * Webpack Visualizer
     * https://github.com/chrisbateman/webpack-visualizer
     */

    new visualizer(),
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: true,
      sourceMap: true,
      warnings: true,
    }),
    /**
     * Webpack Manifest Plugin
     * https://github.com/danethurber/webpack-manifest-plugin
     */

    new manifestPlugin(),
  ],

  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
    {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
      }],
    },
    {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      }],
    }]
  },
}
