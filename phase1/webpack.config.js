'use strict';

module.exports = {
  entry: './phase1/src/index.js',
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
