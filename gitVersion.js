/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { version } = JSON.parse(fs.readFileSync(path.resolve('./', 'package.json'), 'utf8'));
const { spawn } = require('child_process');

const tag = spawn('git', ['tag', `v${version}`]);

tag.on('error', () => {
  const e = new Error();
  e.message = `${chalk.red(`Could not create Tag v${version}`)}`;
  process.emit('error', e);
});

tag.on('close', () => {
  console.log(`${chalk.green(`Tag v${version} created`)}`);
  const push = spawn('git', ['push', 'origin', `v${version}`]);
  push.on('error', () => {
    const e = new Error();
    e.message = `${chalk.red(`Could not push Tag v${version} to server`)}`;
    process.emit('error', e);
  });

  push.on('close', () => {
    console.log(`${chalk.green(`Tag v${version} pushed to remove server`)}`);
    process.exit(0);
  });
});
