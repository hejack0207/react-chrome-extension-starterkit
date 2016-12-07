const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const outputPath = path.resolve(__dirname, '../dist');

function productionOr(prod, other) {
  if (process.env.NODE_ENV === 'production')
    return prod;
  return other;
}

let plugins = [
  new ExtractTextPlugin('[name].css'),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new CopyPlugin([
    {from: './public/*.html', to: './[name].[ext]'},
    {from: './public/*.json', to: './[name].[ext]'},
    {from: './public/*.png', to: './media/[name].[ext]'}
  ])
];

plugins = productionOr(plugins.concat([
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: true,
  })
]), plugins);

module.exports = {
  plugins: plugins,
  productionOr: productionOr,
  outputPath: outputPath};