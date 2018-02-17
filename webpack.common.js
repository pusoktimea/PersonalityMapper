const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    app: path.resolve(src, 'index.js')
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      components: path.resolve(src, 'components'),
      pages: path.resolve(src, 'pages'),
      actions: path.resolve(src, 'actions'),
      reducers: path.resolve(src, 'reducers'),
      selectors: path.resolve(src, 'selectors'),
      utils: path.resolve(src, 'utils'),
      styles: path.resolve(src, 'styles'),
      images: path.resolve(src, 'images')
    },
    extensions: ['.js', '.jsx'],
    enforceExtension: false
  },
  module: {
    rules: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|eot|otf|webp|svg|ttf|woff|woff2)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash:8].js',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') >= 0;
      }
    })
  ],
  output: {
    filename: '[name].[hash:6].bundle.js',
    path: dist,
    publicPath: '/'
  }
};
