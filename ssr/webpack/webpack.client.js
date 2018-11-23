const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base.js');

const mode = process.env.NODE_ENV || 'development';

const clientConfig = {
  mode,
  entry: './client/index.js',
  output: {
    filename: 'js/client-bundle.js',
    path: path.resolve(__dirname, '../public')
  }
};

module.exports = merge(config, clientConfig);
