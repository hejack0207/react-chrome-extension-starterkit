const common = require('./common');
const webpack = require('webpack');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    popup: "./src/ui/browser_action/index.tsx",
    options: "./src/ui/options/index.tsx",
    'tweet-link': './src/ui/tweetLink/index.tsx',
    vendor: ['react', 'react-dom', 'qs']
  },
  output: {
    filename: "[name].js",
    path: common.outputPath
  },

  devtool: common.productionOr("", "source-map"),

  resolve: {
    extensions: ["", ".ts", ".tsx", ".js"]
  },

  module: {
    loaders: [
      {test: /\.tsx?$/, loader: "ts-loader"},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style', ['css'])},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', ['css', 'sass'])},
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'media/[name].[hash:8].[ext]'
        }
      },
    ],

    preLoaders: [
      {
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          /node_modules/
        ]
      }
    ]
  },

  plugins: common.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity
    }),
    new CleanPlugin([common.outputPath], {root: path.resolve(__dirname, '..')}),
  ])
};