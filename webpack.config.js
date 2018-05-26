/*
 * Builds:
 * default => /dist/L2Dwidget.min.js, production, polyfill, chunk
 * single => /dist/L2Dwidget.single.min.js, production, polyfill, single
 * nopolyfill => /dist/L2Dwidget.nopolyfill.min.js, production, nopolyfill, single
 * umd => /dist/umd/L2Dwidget.js, production, nopolyfill, chunk
 * dev => /dist/dev/L2Dwidget.js, development, polyfill, single
 */

// Babel-plugin-syntax-dynamic-import must be installed to allow code splitting using import().

/* global __dirname */
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const thisPkgInfo = require('./package');
const nowDate = new Date();

const UglifyJS = new UglifyJsPlugin({
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


const baseConfig = {
  'devtool': 'source-map',

  /*
   * TOCONCAT entry
   * TOCONCAT mode
   */
  'module': {
    'rules': [{
      'include': path.resolve(__dirname, 'src'),
      'test': /\.js$/,
      'use': [{'loader': 'babel-loader'}],
    },
    {
      'test': /\.html$/,
      'use': [{
        'loader': 'html-loader',
        'options': {'minimize': true},
      }],
    }],
  },

  /*
   * TOCONCAT optimization
   * TOCONCAT output
   * TOCONCAT plugins
   */
  'resolve': {
    'extensions': ['.js',
      '.html',
      '.json',
      '.webpack.js',
      '.web.js'],
  },
  'target': 'web',
  'watch': false,
};

/**
 * Get default config.
 * @return {Object} Full config for webpack.
 */
function getDefault () {

  console.log('Build: default.');

  const entry = ['./src/lib/polyfill.nodoc',
    './src/lib/setEnv.nodoc',
    './src/index'];
  const mode = 'production';
  const optimization = {'minimizer': [UglifyJS]};
  const output = {
    'chunkFilename': 'L2Dwidget.[id].min.js',
    'filename': 'L2Dwidget.min.js',
    'library': 'L2Dwidget',
    'libraryExport': 'L2Dwidget',
    'libraryTarget': 'var',
    'path': path.resolve(__dirname, 'dist'),
  };
  const plugins = [UglifyJS,

    // Banner must sort after UglifyJS, or it won't work.
    new webpack.BannerPlugin(`https://github.com/xiazeyu/live2d-widget.js built-v${thisPkgInfo.version}@${nowDate.toLocaleDateString()},default ${nowDate.toLocaleTimeString()}`),

    /**
     * Webpack Manifest Plugin
     * https://github.com/danethurber/webpack-manifest-plugin
     */
    new ManifestPlugin({'fileName': 'manifest_default.json'}),

    /**
     * Webpack Visualizer
     * https://github.com/chrisbateman/webpack-visualizer
     */
    new Visualizer({'filename': 'stats_default.html'})];

  const restConfig = {
    entry,
    mode,
    optimization,
    output,
    plugins,
  };

  return Object.assign({}, baseConfig, restConfig);

}

/**
 * Get single config.
 * @return {Object} Full config for webpack.
 */
function getSingle () {

  console.log('Build: single.');

  const entry = ['./src/lib/polyfill.nodoc',
    './src/lib/setEnv.nodoc',
    './src/main',
    './src/index'];
  const mode = 'production';
  const optimization = {'minimizer': [UglifyJS]};
  const output = {
    'filename': 'L2Dwidget.single.min.js',
    'library': 'L2Dwidget',
    'libraryExport': 'L2Dwidget',
    'libraryTarget': 'var',
    'path': path.resolve(__dirname, 'dist'),
  };
  const plugins = [UglifyJS,

    // Banner must sort after UglifyJS, or it won't work.
    new webpack.BannerPlugin(`https://github.com/xiazeyu/live2d-widget.js built-v${thisPkgInfo.version}@${nowDate.toLocaleDateString()},single ${nowDate.toLocaleTimeString()}`),

    /**
     * Webpack Manifest Plugin
     * https://github.com/danethurber/webpack-manifest-plugin
     */
    new ManifestPlugin({'fileName': 'manifest_single.json'}),

    /**
     * Webpack Visualizer
     * https://github.com/chrisbateman/webpack-visualizer
     */
    new Visualizer({'filename': 'stats_single.html'})];

  const restConfig = {
    entry,
    mode,
    optimization,
    output,
    plugins,
  };

  return Object.assign({}, baseConfig, restConfig);

}

/**
 * Get nopolyfill config.
 * @return {Object} Full config for webpack.
 */
function getNoPolyFill () {

  console.log('Build: nopolyfill.');

  const entry = ['./src/lib/setEnv.nodoc',
    './src/main',
    './src/index'];
  const mode = 'production';
  const optimization = {'minimizer': [UglifyJS]};
  const output = {
    'filename': 'L2Dwidget.nopolyfill.min.js',
    'library': 'L2Dwidget',
    'libraryExport': 'L2Dwidget',
    'libraryTarget': 'var',
    'path': path.resolve(__dirname, 'dist'),
  };
  const plugins = [UglifyJS,

    // Banner must sort after UglifyJS, or it won't work.
    new webpack.BannerPlugin(`https://github.com/xiazeyu/live2d-widget.js built-v${thisPkgInfo.version}@${nowDate.toLocaleDateString()},nopolyfill ${nowDate.toLocaleTimeString()}`),

    /**
     * Webpack Manifest Plugin
     * https://github.com/danethurber/webpack-manifest-plugin
     */
    new ManifestPlugin({'fileName': 'manifest_nopolyfill.json'}),

    /**
     * Webpack Visualizer
     * https://github.com/chrisbateman/webpack-visualizer
     */
    new Visualizer({'filename': 'stats_nopolyfill.html'})];

  const restConfig = {
    entry,
    mode,
    optimization,
    output,
    plugins,
  };

  return Object.assign({}, baseConfig, restConfig);

}

/**
 * Get umd config.
 * @return {Object} Full config for webpack.
 */
function getUmd () {

  console.log('Build: umd.');

  const entry = ['./src/lib/setEnv.nodoc',
    './src/main',
    './src/index'];
  const mode = 'production';
  const output = {
    'filename': 'L2Dwidget.js',
    'library': 'L2Dwidget',
    'libraryExport': 'L2Dwidget',
    'libraryTarget': 'umd',
    'path': path.resolve(__dirname, 'dist', 'umd'),
  };
  const plugins = [new webpack.BannerPlugin(`https://github.com/xiazeyu/live2d-widget.js built-v${thisPkgInfo.version}@${nowDate.toLocaleDateString()},umd ${nowDate.toLocaleTimeString()}`),

  /**
   * Webpack Manifest Plugin
   * https://github.com/danethurber/webpack-manifest-plugin
   */
    new ManifestPlugin({'fileName': 'manifest_umd.json'}),

    /**
   * Webpack Visualizer
   * https://github.com/chrisbateman/webpack-visualizer
   */
    new Visualizer({'filename': 'stats_umd.html'})];

  const restConfig = {
    entry,
    mode,
    output,
    plugins,
  };

  return Object.assign({}, baseConfig, restConfig);

}

/**
 * Get dev config.
 * @return {Object} Full config for webpack.
 */
function getDev () {

  console.log('Build: dev.');

  const entry = ['./src/lib/polyfill.nodoc',
    './src/lib/setEnv.nodoc',
    './src/main',
    './src/index'];
  const mode = 'development';
  const output = {
    'filename': 'L2Dwidget.js',
    'library': 'L2Dwidget',
    'libraryExport': 'default',
    'libraryTarget': 'var',
    'path': path.resolve(__dirname, 'dist', 'dev'),
  };
  const plugins = [new webpack.BannerPlugin(`___DEV___https://github.com/xiazeyu/live2d-widget.js built-v${thisPkgInfo.version}@${nowDate.toLocaleDateString()},umd ${nowDate.toLocaleTimeString()}`),

  /**
   * Webpack Manifest Plugin
   * https://github.com/danethurber/webpack-manifest-plugin
   */
    new ManifestPlugin({'fileName': 'manifest_dev.json'}),

    /**
   * Webpack Visualizer
   * https://github.com/chrisbateman/webpack-visualizer
   */
    new Visualizer({'filename': 'stats_dev.html'})];

  const restConfig = {
    entry,
    mode,
    output,
    plugins,
  };

  return Object.assign({}, baseConfig, restConfig);

}

module.exports = (env) => {

  console.log(`Current build mode is '${env}'.`);
  switch (env) {

  case 'development': return getDev();
  case 'production':
  default: return [getDefault(),
    getSingle(),
    getNoPolyFill(),
    getUmd(),
    getDev()];

  }

};
