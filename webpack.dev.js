const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

const dist = path.resolve(__dirname, 'dist');

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  bail: true,
  devServer: {
    contentBase: dist,
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    stats: {
      chunks: false,
      chunkModules: false,
      modules: false,
      source: false,
      colors: true,
      children: false,
      maxModules: 2
    }
  },
  watchOptions: {
    ignored: '/node_modules/'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
