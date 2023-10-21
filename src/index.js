#!/usr/bin/env node
import inquirer from 'inquirer';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { config } from './config.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { copyFiles } from './utils/helper.js';
import { printLogo } from './utils/log.js';

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

  const filesDir = path.resolve(__dirname, 'files');
  console.log(filesDir);

  mkdirSync(name, { recursive: true });

  process.chdir(path.resolve(name));
  execSync('npm init -y');

  const CURR_DIR = process.cwd();
  copyFiles(filesDir, CURR_DIR);

  const { dependencies, devDependencies, packageJsonScripts } = config;

  const packageJson = JSON.parse(readFileSync('package.json'));
  packageJson.main = 'src/index.ts';
  packageJson.scripts = packageJsonScripts;
  writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

  execSync(`npm i ${dependencies.join(' ')}`, {
    stdio: 'inherit',
  });

  execSync(`npm i -D ${devDependencies.join(' ')}`, {
    stdio: 'inherit',
  });

  console.log('🏁 Done!\n');

  console.log(`cd ${name} && npm run dev`);
} catch (error) {
  console.log(error.message);
  process.exit(1);
}
