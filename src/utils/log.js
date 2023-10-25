import gradient from 'gradient-string';
import figlet from 'figlet';
import chalk from 'chalk';

export const printError = (message) => {
  const error = chalk.bold.red;
  console.log('\n', error(message), '\n');
};

export const printLogo = () => {
  console.log(
    gradient(['springgreen', 'limegreen', 'green', 'forestgreen'])(
      figlet.textSync(' AppXpresso ', 'Train')
    )
  );
  console.log('\n');
};

export const printSuccess = (message) => {
  const success = chalk.bold.green;
  console.log('\n', success(message), '\n');
};

export const printCommandText = (text) => {
  const cmd = chalk.bgBlue.whiteBright.italic;
  console.log('\n ', cmd(text), ' \n');
};
