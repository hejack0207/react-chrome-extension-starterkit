const common = require('./common');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [new ExtractTextPlugin('[name].css')];

module.exports = {
  entry: {
    handler: './src/background/handler.ts',
    menu: './src/background/menu.ts',
    launcher: './src/content_scripts/launcher.ts'
  },
  output: {
    filename: '[name].js',
    path: common.outputPath,
    library: '[name]',
    libraryTarget: 'this'
  },

  devtool: common.productionOr('', 'source-map'),

  resolve: {
    extensions: ['', '.ts', '.tsx', '.js']
  },

  plugins: common.productionOr(plugins.concat(new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: true,
    })
  ), plugins),

  module: {
    loaders: [
      {test: /\.tsx?$/, loader: 'ts-loader'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style', ['css'])},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', ['css', 'sass'])},
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'media/[name].[hash:8].[ext]'
        }
      }
    ],

    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          /node_modules/
        ]
      }
    ]
  }
};
