// const start = require('./start');
import { start } from './start.js';

function makeDefaultConfig(userConfig) {
  return {
    openBrowser: true,
    port: 9000,
    outputPath: 'dist/libra',
    ...userConfig
  };
}

export default function (userConfig) {
  const config = makeDefaultConfig(userConfig);

  return {
    start: (callback) => {
      start(config, callback);
      // source(config, callback);
      // start(config, callback);
    }
    // build: (callback) => {
    //   // source(config, callback);
    //   // build(config, callback);
    // },
    // source: (callback) => source(config, callback),
    // clean: (callback) => clean(config, callback)
  };
}
