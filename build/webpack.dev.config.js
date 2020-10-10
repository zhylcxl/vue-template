const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const portfinder = require('portfinder');
const FriendkyErrorsPlguin = require('friendly-errors-webpack-plugin');

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: false,
    host: 'localhost',
    port: 3000,
    quiet: true
  },
});

module.exports = new Promise((resolve, rejects) => {
  const host = devConfig.devServer.host;
  portfinder.basePort = devConfig.devServer.port;
  portfinder.getPort((err, port) => {
    if(err) {
      rejects(err);
    } else {
      devConfig.devServer.port = port;
      devConfig.plugins.push(new FriendkyErrorsPlguin({
        compilationSuccessInfo: {
          messages: [`You application is running here http://${host}:${port}`]
        }
      }));
      resolve(devConfig);
    }
  })
})