const webpack = require('webpack');
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const visualizer = require('webpack-visualizer-plugin');
const manifestPlugin = require('webpack-manifest-plugin');
const nowDate = new Date();
const isProd = e => e === 'prod';

module.exports = env => {return{

  entry: [
    './src/utils/wpPublicPath.js',
    './src/index.js',
  ],

  output: {
    filename: 'clL2D.min.js',
    // YOU MUST INSTALL babel-plugin-syntax-dynamic-import FIRST TO ENABLE CODE SPLITTING!
    chunkFilename: 'clL2D.[id].min.js',
    library: 'initL2Dwidget',
    libraryExport: 'init',
    libraryTarget: 'var',
    path: path.resolve(__dirname, (isProd(env) ? 'lib' : 'dev')),
    pathinfo: (isProd(env) ? false : true),
  },

  target: 'web',

  devtool: 'source-map',

  watch: (isProd(env) ? false : true),

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify((isProd(env) ? 'production' : 'development')),
      }
    }),
    new UglifyJsPlugin({
      cache: false,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        // The L2D core library was droped too much,
        // so the warnings is useless recently.
        warnings: false,
        mangle: true,
        compress: {
          drop_console: false,
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

  resolve: {
    extensions: ['.js', '.webpack.js', '.web.js'],
  },

  module: {
    rules: [
      {test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: [{
          loader: 'babel-loader',
        }],
      },
      {test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        }],
      },
    ]
  },
}}
