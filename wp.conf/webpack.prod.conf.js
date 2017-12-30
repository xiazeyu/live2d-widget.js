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
    path: path.resolve(__dirname, '..', 'lib'),
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.BannerPlugin("https://github.com/xiazeyu/live2d-widget.js~built@" + nowDate.toLocaleDateString() + " "+ nowDate.toLocaleTimeString()),
    /**
     * visualizer generator
     * https://github.com/chrisbateman/webpack-visualizer
     */
    new visualizer(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        dead_code: true,
        drop_debugger: true,
        drop_console: false,
      },
      mangle: true,
      sourceMap: false,
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
