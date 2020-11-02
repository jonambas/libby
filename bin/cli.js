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
    --output, -o   Sets path to build directory
    --port, -p     Sets port to open browser
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
      },
      output: {
        type: 'string',
        alias: 'o'
      },
      port: {
        type: 'number',
        alias: 'p'
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

  const configPath = await findUp('.libra/config.js');

  if (!configPath) {
    console.error('Please add ./libra/config.js to your project.');
    process.exit(1);
  }

  const libra = lib({
    cwd: path.dirname(configPath),
    ...(flags.output ? { outputPath: flags.output } : {}),
    ...(flags.port ? { port: flags.port } : {})
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
