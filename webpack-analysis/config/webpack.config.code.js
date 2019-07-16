const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, '../src1/index.js'),
    another: path.resolve(__dirname, '../src1/another-module.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist1')
  }
};