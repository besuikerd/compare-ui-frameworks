var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    styles: 'stylesheets/app.scss',
    frameworks: 'frameworks',
    app: [
      'app',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?reload=true'
    ]
  },

  output: {
    path: '/',
    publicPath: 'http://localhost:3000/',
    filename: '[name].js',
    chunkFilename: '[chunkhash.js]'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['babel-plugin-transform-decorators-legacy']
        }
      },

      {
        test: /(\.scss|\.css)$/,
        loader: 'style!css!postcss!sass'
      },

      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'elm-webpack?cwd=assets/js/frameworks/elm'
      },

      {
        test: /(\.md|\.html)$/,
        loader: 'raw-loader'
      },

      {
        test: /\.json$/,
        loader: 'json'
      },


      //fonts
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },

      //put React in the global namespace
      { test: require.resolve('react'), loader: 'expose?React' }
    ]
  },
  postcss: [autoprefixer],

  devtool: 'eval-source-map',
  resolve: {
    modulesDirectories: [ 'node_modules', path.join(__dirname, 'assets/js'), path.join(__dirname, 'assets') ]
  },

  plugins: [
    // new ExtractTextPlugin('css/[name].css'),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
