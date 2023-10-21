#!/usr/bin/env node
import inquirer from 'inquirer';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's the app name?",
    default: 'express-app',
  },
];

try {
  const answers = await inquirer.prompt(questions);
  const { name } = answers;

  // if (existsSync(name)) {
  //   throw new Error('Folder already exists, try another name');
  // }

  const srcFileDir = path.resolve('src');

  const config = readFileSync(path.resolve(srcFileDir, 'config.json'));
  const { dependencies, devDependencies, packageJsonScripts } =
    JSON.parse(config);

  mkdirSync(name, { recursive: true });

  process.chdir(path.resolve(name));
  execSync('npm init -y');

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

  console.log('🏁 Done!');
} catch (error) {
  console.log(error.message);
  process.exit(1);
}
