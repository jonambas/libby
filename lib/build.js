import webpack from 'webpack';
import chalk from 'chalk';
import makeConfig from './makeConfig.js';
import path from 'path';

const noop = () => {};

const build = async (config, callback = noop) => {
  console.log(chalk.gray('Building Libra'));
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

    console.log(chalk.green('Build Done'));
    console.log(chalk.gray('→ ' + path.resolve(config.cwd, '../', config.outputPath)));
    return callback();
  });
};

export { build };
