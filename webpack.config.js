/* global __dirname */
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const visualizer = require('webpack-visualizer-plugin');
const manifestPlugin = require('webpack-manifest-plugin');
const nowDate = new Date();

/**
 * To check is this build the production build
 * @param  {String}  e  Build type
 * @return {Boolean}    If the build is production build
 */
function isProd (e) {

  return e === 'prod';

}

module.exports = (env) => ({

  'devtool': 'source-map',

  'entry': [
    'core-js/fn/promise',
    'core-js/fn/symbol',
    'core-js/fn/object/assign',
    './src/wpPublicPath',
    './src/index',
  ],

  'module': {
    'rules': [
      {
        'include': path.resolve(__dirname, 'src'),
        'test': /\.js$/,
        'use': [
          {
            'loader': 'babel-loader',
          },
        ],
      },
      {
        'test': /\.html$/,
        'use': [
          {
            'loader': 'html-loader',
            'options': {
              'minimize': true,
            },
          },
        ],
      },
    ],
  },

  'output': {

    /*
     * YOU MUST INSTALL babel-plugin-syntax-dynamic-import FIRST TO ENABLE CODE SPLITTING!
     * May change in Webpack@4
     */
    'chunkFilename': 'L2Dwidget.[id].min.js',
    'filename': 'L2Dwidget.min.js',
    'library': 'L2Dwidget',
    'libraryExport': 'L2Dwidget',
    'libraryTarget': 'var',
    'path': path.resolve(__dirname, 'lib'),
    'pathinfo': !isProd(env),
  },

  'plugins': [
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify(isProd(env) ? 'production' : 'development'), }, }),
    new UglifyJsPlugin({
      'cache': false,
      'parallel': true,
      'sourceMap': true,
      'uglifyOptions': {

        /*
         * The L2D core library was droped too much,
         * so the warnings is useless recently.
         */
        'warnings': false,
        'mangle': true,
        'compress': {
          'drop_console': false,
        },
      },
    }),
    // Banner must be put below UglifyJsPlugin, or it won't work.
    new webpack.BannerPlugin(`${isProd(env) ? '' : '___DEV___'}https://github.com/xiazeyu/live2d-widget.js built@${nowDate.toLocaleDateString()} ${nowDate.toLocaleTimeString()}`),

    /**
     * Webpack Manifest Plugin
     * https://github.com/danethurber/webpack-manifest-plugin
     */
    new manifestPlugin(),

    /**
     * Webpack Visualizer
     * https://github.com/chrisbateman/webpack-visualizer
     */
    new visualizer(),
  ],

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

  'watch': !isProd(env),
});
