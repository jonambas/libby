import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import open from 'open';
import makeConfig from './makeConfig.js';

const start = async (config, callback) => {
  // Make dev webpack config
  const webpackConfig = await makeConfig(config, {
    production: false
  });

  const webpackDevServerConfig = {
    hot: true,
    stats: {},
    noInfo: true,
    quiet: true,
    clientLogLevel: 'error',
    compress: true,
    inline: true,
    watchOptions: { ignored: /node_modules/ }
  };

  const compiler = webpack(webpackConfig);
  const devServer = new WebpackDevServer(compiler, webpackDevServerConfig);

  const { port, openBrowser } = config;

  devServer.listen(port, '0.0.0.0', (...args) => {
    const [err] = args;

    if (!err && openBrowser) {
      open(`http://localhost:${port}`);
    }

    if (typeof callback === 'function') {
      callback(...args);
    }
  });
};

export { start };
