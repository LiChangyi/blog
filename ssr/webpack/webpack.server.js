const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const config = require('./webpack.base.js');

const mode = process.env.NODE_ENV || 'development';

const serverConfig = {
  target: 'node',
  mode,
  entry: './server/index.js',
  output: {
    filename: 'server-bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  externals: [nodeExternals()]
};

module.exports = merge(config, serverConfig);
