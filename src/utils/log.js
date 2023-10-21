import gradient from 'gradient-string';
import figlet from 'figlet';
import animation from 'chalk-animation';
export const printLogo = () => {
  console.log(
    gradient(['springgreen', 'limegreen', 'green', 'forestgreen'])(
      figlet.textSync(' AppXpresso ', 'Train')
    )
  );
  console.log('\n');
};
