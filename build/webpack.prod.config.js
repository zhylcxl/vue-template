const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const utils = require('./utils');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: utils.assetsPath('js/[name].[hash:7].js')
  }
});