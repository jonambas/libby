#! /usr/bin/env node
import path from 'path';
import meow from 'meow';
import findUp from 'find-up';
import lib from '../lib/index.js';

// CLI

const cli = meow(
  `
  Usage
    $ libra <command> [options...]
  
  Commands
    start          Starts the libra UI
    build          Builds the libra UI
    help           Displays this usage guide

	Options
    --help, -h     Displays this usage guide
    --version, -v  Displays version info
`,
  {
    flags: {
      help: {
        type: 'boolean',
        alias: 'h'
      },
      version: {
        type: 'boolean',
        alias: 'v'
      }
    }
  }
);

async function libra(command, flags) {
  if (flags.version) {
    cli.showVersion(1);
  }

  if (command === 'help') {
    cli.showHelp();
    process.exit(1);
  }

  const configPath = await findUp('libra.config.js');

  if (!configPath) {
    console.error('Please add a libra.config.js to the root of your project.');
    process.exit(1);
  }

  const config = configPath;

  const libra = lib({
    cwd: path.dirname(configPath),
    ...config
  });

  if (libra.hasOwnProperty(command)) {
    libra[command]((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  } else {
    cli.showHelp();
    process.exit(1);
  }
}

libra(cli.input[0], cli.flags);
