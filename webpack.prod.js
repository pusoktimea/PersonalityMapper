const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map',
  stats: 'verbose',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin({sourceMap: true})
    // @TODO - add back in the near future
    // new CompressionPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // })
  ]
});
