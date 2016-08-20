var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var srcDir = path.join(__dirname, 'src');
var clientDir = path.join(srcDir, 'client');
var outputDir = path.join(srcDir, 'dist');

module.exports = {
  devtool: 'source-map',

  entry: [
    path.join(clientDir, 'vendor.ts'),
    path.join(clientDir, 'index.ts')
  ],

  output: {
    path: outputDir,
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      { from: path.join(clientDir, 'index.html') }, {from: path.join(clientDir, 'assets'), to: 'assets'}
    ])
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },

  module: {
    loaders: [
      { test: /\.ts$/,  loader: 'ts-loader', exclude: /node_modules/ },
      { test: /\.js$/,  loader: 'babel', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'html' }
    ]
  },

  noParse: [
    /rtts_assert\/src\/rtts_assert/
  ],

  htmlLoader: {
    attrs: []
  }
};
