import { start } from './start.js';
import { build } from './build.js';

function makeDefaultConfig(userConfig) {
  return {
    openBrowser: true,
    port: 9000,
    outputPath: 'libra-build',
    ...userConfig
  };
}

export default function (userConfig) {
  const config = makeDefaultConfig(userConfig);

  return {
    start: (callback) => {
      start(config, callback);
    },
    build: (callback) => {
      build(config, callback);
    }
  };
}
