var webpack = require('webpack');
var path = require('path')
var Visualizer = require('webpack-visualizer-plugin');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  entry: [
    "./src/index.js",
  ],
  output: {
    filename: "clL2D.min.js",
    path: __dirname + "/lib"
  },

  devtool: "source-map",

  plugins: [
    new webpack.DefinePlugin({ // Set the development environment
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),

    new webpack.BannerPlugin("DEVELOPING BUILD\nhttps://github.com/EYHN/hexo-helper-live2d -The file is creted at " + new Date()),

    new Visualizer(), // https://github.com/chrisbateman/webpack-visualizer
                      // visualizer generator

    new webpack.optimize.UglifyJsPlugin({ // Compress cJs
      compress: true,
      warnings: true,
      sourceMap: true,
      mangle: true
    }),
  ],

  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: path.resolve(__dirname, "node_modules"),
      use: [{
        loader: 'babel-loader',
          query: {
            presets: ["env"]
          }
      }],
    }]
  }
}
