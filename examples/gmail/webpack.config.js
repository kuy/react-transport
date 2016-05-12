'use strict';

module.exports = {
  entry: './examples/gmail/src/content.js',
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
