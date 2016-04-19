'use strict';

module.exports = {
  entry: './phase2/src/content.js',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },
  output: {
    path: __dirname + '/js',
    filename: 'content.js',
  },
  devtool: 'inline-source-map'
};
