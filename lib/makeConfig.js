const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
const makeDefaultConfig = require('./makeDefaultConfig');

const libbyPath = path.resolve(__dirname, '..');
const includePaths = [path.resolve(libbyPath, 'src')];

module.exports = async (config, options) => {
  const devServerEntries = options.production
    ? []
    : [`webpack-dev-server/client?http://localhost:${config.port}`, 'webpack/hot/dev-server'];

  const libbyConfig = {
    mode: options.production ? 'production' : 'development',
    entry: {
      main: [...devServerEntries, path.resolve(libbyPath, 'src/ui/index.js')],
      preview: [...devServerEntries, path.resolve(libbyPath, 'src/preview/index.js')]
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(config.cwd, config.outputPath)
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      alias: {
        __LIBBY_CONFIG__: path.resolve(config.cwd, 'libby.config.js'),
        __LIBBY_LAYOUT__: config.layout
          ? path.resolve(config.cwd, config.layout)
          : path.resolve(libbyPath, 'src/preview/defaultLayout.js'),
        react: path.resolve(config.cwd, 'node_modules/react')
      }
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: includePaths,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-optional-chaining'
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: config.title ? `Libby | ${config.title}` : 'Libby',
        chunksSortMode: 'none',
        chunks: ['main'],
        filename: 'index.html',
        favicon: path.resolve(libbyPath, 'src/favicon.png')
      }),
      new HtmlWebpackPlugin({
        title: 'Libby Preview',
        chunksSortMode: 'none',
        chunks: ['preview'],
        filename: 'iframe.html',
        favicon: path.resolve(libbyPath, 'src/favicon.png')
      }),
      ...(options.production
        ? [new WebpackBar({ name: 'Libby' })]
        : [new webpack.HotModuleReplacementPlugin(), new FriendlyErrorsWebpackPlugin()])
    ],
    devtool: 'cheap-module-source-map'
  };

  const userConfig = config.webpackConfig
    ? await config.webpackConfig()
    : makeDefaultConfig(config);

  return merge(libbyConfig, userConfig);
};
