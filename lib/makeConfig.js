const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const WebpackBar = require('webpackbar');

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
        react: path.resolve(config.cwd, '../node_modules/react')
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
        },
        {
          // Default config, to be replaced by user config
          test: /\.js?$/,
          include: config.cwd,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.css?$/,
          include: config.cwd,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
          include: config.cwd,
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[ext]'
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
        title: 'iframe',
        chunksSortMode: 'none',
        chunks: ['preview'],
        filename: 'iframe.html'
      }),
      ...(options.production
        ? [new WebpackBar({ name: 'Libby' })]
        : [
            new webpack.HotModuleReplacementPlugin(),
            new FriendlyErrorsWebpackPlugin(),
            new ErrorOverlayPlugin()
          ])
    ],
    devtool: 'cheap-module-source-map'
  };

  // const userConfig = config.webpackConfig
  //   ? await config.webpackConfig()
  //   : ;

  // return merge(libbyConfig, userConfig);
  return libbyConfig;
};
