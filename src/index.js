#!/usr/bin/env node
import inquirer from 'inquirer';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { config } from './config.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { copyFiles } from './utils/helper.js';
import {
  printCommandText,
  printError,
  printLogo,
  printSuccess,
} from './utils/log.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const questions = [
  {
    type: 'input',
    name: 'name',
    message: "Let's App-ly Some Creativity: Name your app!",
    default: 'express-app',
  },
];

printLogo();

try {
  const answers = await inquirer.prompt(questions);
  const { name } = answers;

  if (existsSync(name)) {
    throw new Error('Folder already exists, try another name');
  }

  mkdirSync(name, { recursive: true });

  process.chdir(path.resolve(name));
  execSync('npm init -y');

  const filesDir = path.resolve(__dirname, 'files');
  const CURR_DIR = process.cwd();
  copyFiles(filesDir, CURR_DIR);

  const { dependencies, devDependencies, packageJsonScripts } = config;

  const packageJson = JSON.parse(readFileSync('package.json'));
  packageJson.main = 'src/index.ts';
  packageJson.scripts = packageJsonScripts;
  writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

  console.time('⏱️  dependencies installed in');
  console.log('\n🏗️  installing dependencies...');
  execSync(`npm i ${dependencies.join(' ')}`, {
    stdio: 'inherit',
  });
  console.timeEnd('⏱️  dependencies installed in');

  console.time('⏱️  dev-dependencies installed in');
  console.log('\n🔩 installing dev-dependencies...');
  execSync(`npm i -D ${devDependencies.join(' ')}`, {
    stdio: 'inherit',
  });
  console.timeEnd('⏱️  dev-dependencies installed in');

  printSuccess(`🚀 ${name} created successfully`);

  console.log('run the below command to start the server:');
  printCommandText(` cd ${name} && npm run dev `);
} catch (error) {
  printError(error.message);
  process.exit(1);
}
