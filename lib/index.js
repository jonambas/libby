import { start } from './start.js';
import { build } from './build.js';

function makeDefaultConfig(config) {
  return {
    openBrowser: true,
    port: 9000,
    outputPath: 'dist/libby',
    ...config
  };
}

export default function (userConfig) {
  const config = makeDefaultConfig(userConfig);
  console.log(config);
  return {
    start: (callback) => {
      start(config, callback);
    },
    build: (callback) => {
      build(config, callback);
    }
  };
}
