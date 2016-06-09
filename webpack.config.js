var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './app'
  ],
  output: {
    path: path.join(__dirname, 'dist/static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css', { allChunks: true }),
    new ngAnnotatePlugin({add: true }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: [__dirname]
      },
      {
         test: /\.(otf|eot|svg|ttf|woff)/,
         loader: 'url-loader?limit=8192'
      },
      {
         test: /\.(jpg|png)/,
         loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(sass|css)$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!sass'
        )
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname)) + '/!html'
      }
    ]
  },
  postcss: [
    require('autoprefixer'),
  ],
}
