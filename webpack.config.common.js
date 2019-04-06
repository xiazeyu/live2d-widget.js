const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nowDate = new Date();
const isProd = e => e === 'prod';

module.exports = env => {return{

  entry: [
    './src/index.js',
  ],

  output: {
    filename: 'L2Dwidget.common.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'lib'),
    pathinfo: (isProd(env) ? false : true),
  },

  target: 'node',

  devtool: 'source-map',

  watch: (isProd(env) ? false : true),

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify((isProd(env) ? 'production' : 'development')),
      },
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
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    // Banner must be put below UglifyJsPlugin, or it won't work.
    new webpack.BannerPlugin(`${isProd(env) ? '' : '___DEV___'}https://github.com/xiazeyu/live2d-widget.js built@${nowDate.toLocaleDateString()} ${nowDate.toLocaleTimeString()}`),
  ],

  resolve: {
    extensions: ['.js','.html', '.webpack.js', '.web.js'],
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
