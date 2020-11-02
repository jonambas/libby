import webpack from 'webpack';
import makeConfig from './makeConfig.js';

const noop = () => {};

const build = async (config, callback = noop) => {
  // console.log(chalk.gray('Building...'));
  const webpackConfig = await makeConfig(config, { production: true });

  webpack(webpackConfig, (err, stats) => {
    // https://webpack.js.org/api/node/#error-handling
    if (err) {
      const errorMessage = [err.stack || err, err.details].filter(Boolean).join('/n/n');
      return callback(errorMessage);
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      return callback(info.errors.join('\n\n'));
    }

    // console.log(chalk.green('Proply build done'));
    return callback();
  });
};

export { build };
