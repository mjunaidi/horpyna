var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var node_modules = {};
fs.readdirSync('node_modules')
  .forEach(function(mod) {
    node_modules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['babel?presets[]=es2015,presets[]=stage-0'],
        include: path.join(__dirname, 'src/'),
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },
  entry: [
    './src/index.js'
  ],
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ],
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, './dist/'),
    filename: 'index.js'
  },
  target: 'node',
  eslint: {

  },
  node: {
    __filename: true,
    __dirname: false
  },
  resolve: {},
  externals: node_modules,
  debug: false,
  progress: false,
  emitError: true,
  emitWarning: true,
  failOnError: true,
  stats: {
    colors: true,
    reasons: true
  }
};
