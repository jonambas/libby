import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import WebpackBar from 'webpackbar';

export default (config, options) => {
  const libraPath = path.resolve('..');
  const includePaths = [
    path.resolve(libraPath, 'src'), // Path to Libra src files
    path.resolve('./'), // Path to user files
    config.cwd // Path to .libra folder
  ];

  const devServerEntries = options.production
    ? []
    : [`webpack-dev-server/client?http://localhost:${config.port}`, 'webpack/hot/dev-server'];

  const generatedConfig = {
    mode: options.production ? 'production' : 'development',
    entry: {
      main: [...devServerEntries, path.resolve(libraPath, 'src/ui/index.js')],
      preview: [...devServerEntries, path.resolve(libraPath, 'src/preview/index.js')]
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(config.cwd, '../', config.outputPath)
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      alias: {
        __LIBRA_CONFIG__: path.resolve(config.cwd, 'config.js'),
        __LIBRA_LAYOUT__: path.resolve(config.cwd, 'layout.js'),
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
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        },
        {
          test: /\.css?$/,
          include: includePaths,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
          include: includePaths,
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[ext]'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: config.title ? `Libra | ${config.title}` : 'Libra',
        chunksSortMode: 'none',
        chunks: ['main'],
        filename: 'index.html',
        favicon: path.resolve(libraPath, 'src/favicon.png')
      }),
      new HtmlWebpackPlugin({
        title: 'iframe',
        chunksSortMode: 'none',
        chunks: ['preview'],
        filename: 'iframe.html'
      }),
      ...(options.production
        ? [new WebpackBar({ name: 'Libra' })]
        : [new webpack.HotModuleReplacementPlugin(), new FriendlyErrorsWebpackPlugin()])
    ]
  };

  return generatedConfig;
};
