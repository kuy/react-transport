'use strict';

module.exports = {
  entry: './examples/bootstrap/src/index.js',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },
  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js',
    publicPath: '/in-memory'
  },
  devtool: 'inline-source-map'
};
