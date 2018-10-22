var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'COSMIC_BUCKET': JSON.stringify(process.env.COSMIC_BUCKET),
        'COSMIC_READ_KEY': JSON.stringify(process.env.COSMIC_READ_KEY),
        'COSMIC_WRITE_KEY': JSON.stringify(process.env.COSMIC_WRITE_KEY)
      }
    }),
    new LiveReloadPlugin({appendScriptTag: true}),
  ]
};
