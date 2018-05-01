/* global __dirname */
const _ = require('lodash');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const uglifyJs = new UglifyJsPlugin({
  'cache': false,
  'parallel': true,
  'sourceMap': true,
  'uglifyOptions': {
    'compress': {
      'drop_console': false,
      'passes': 2,
    },
    'mangle': true,
    'warnings': false,
  },
});
const path = require('path');
const Visualizer = require('webpack-visualizer-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const nowDate = new Date();
const pkgInfo = require('./package');

/**
 * Webpack config
 * @param   {String}  env  Environment varibles, must be 'development' or 'production'
 * @return  {Object}       The config object
 */
module.exports = (env) => ({

  'devtool': 'source-map',

  // DEBUG
  'entry': './src/index',

  'mode': env,

  'module': {
    'rules': [
      {
        'include': path.resolve(__dirname, 'src'),
        'test': /\.js$/,
        'use': [{'loader': 'babel-loader', },],
      },
      {
        'test': /\.html$/,
        'use': [
          {
            'loader': 'html-loader',
            'options': {'minimize': true, },
          },
        ],
      },
    ],
  },

  'optimization': {'minimizer': [uglifyJs, ],},

  'output': {

    /*
     * Babel-plugin-syntax-dynamic-import must be installed to allow code splitting using import()
     */

    'chunkFilename': 'L2Dwidget.[id].min.js',
    'filename': 'L2Dwidget.min.js',
    // DEBUG
    'library': 'L2Dwidget',
    'libraryExport': 'L2Dwidget',
    'libraryTarget': 'var',
    'path': path.resolve(__dirname, 'dist'),
  },

  'plugins': _.concat(env !== 'production' ? [uglifyJs, ] : [], [

    // Banner must be put below UglifyJsPlugin, or it won't work.
    new webpack.BannerPlugin(`${env !== 'production' ? '___DEV___' : ''}https://github.com/xiazeyu/live2d-widget.js built-v${pkgInfo.version}@${nowDate.toLocaleDateString()} ${nowDate.toLocaleTimeString()}`),

    /**
     * Webpack Manifest Plugin
     * https://github.com/danethurber/webpack-manifest-plugin
     */
    new ManifestPlugin(),

  ], env !== 'production' ? [

    /**
     * Webpack Visualizer
     * https://github.com/chrisbateman/webpack-visualizer
     */
    new Visualizer(),

  ] : []),

  'resolve': {
    'extensions': [
      '.js',
      '.html',
      '.json',
      '.webpack.js',
      '.web.js',
    ],
  },

  'target': 'web',

  'watch': false,

});
