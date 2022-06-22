/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const getRepoInfo = require('git-repo-info');

const gitInfo = getRepoInfo();
const { branch } = gitInfo;
const { version } = JSON.parse(fs.readFileSync(path.resolve('./', 'package.json'), 'utf8'));

process.on('error', err => {
  console.warn(err.name);
  console.warn(err.message);
  // if you need more verbose logging you can emit the stack
  // console.warn(err.stack);
  process.exit(1);
});

const VersionCheck = () => {
  if (branch.indexOf('release/') === 0) {
    const branchVersion = branch.split('release/')[1];
    if (branchVersion !== version) {
      return new Error('Version Mismatch');
    }
    return true;
  }
  return false;
};

const isOK = VersionCheck();

if (isOK instanceof Error) {
  isOK.message = `${chalk.red(
    'Your branch version does not match your package.json version.',
  )}\n\nYour Branch is: ${chalk.red(branch)}\nYour package.json version is: ${chalk.red(version)}\n`;
  isOK.name = chalk.red('\nVersion Mismatch');
  process.emit('error', isOK);
} else if (isOK) {
  console.info(`${chalk.green('Branch and Package.json versions match, way to go')}`);
}
