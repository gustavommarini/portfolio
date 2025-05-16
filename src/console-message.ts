import { EMAIL, LOCATION, PHONE, WEBSITE } from './services';

export const consoleCopyrightMessage = () => {
  let blackBackground = [
    'font-size: 30px',
    'background-color: black',
    'color: white',
    'text-transform: uppercase;',
    'font-family: sans-serif',
  ].join(' ;');

  let whiteBackground = [
    'font-size: 30px',
    'background-color: #f3e156',
    'color: black',
    'text-transform: uppercase',
    'font-family: sans-serif',
  ].join(' ;');

  let titleBackground = [
    'font-size: 12px',
    'background-color: #f3e156',
    'color: black',
    'text-transform: uppercase',
    'font-family: sans-serif',
  ].join(' ;');

  console.log('%c Gustavo %c Marini ', blackBackground, whiteBackground);
  console.log(`%c FrontEnd Dev and amateur designer :) `, titleBackground);
  console.log(
    'If you want to reach me, give me an opinion or just have a chat you can do it here:'
  );
  console.groupCollapsed('Contact Me!');
  console.log('email', EMAIL);
  console.log('phone', PHONE);
  console.log('website', WEBSITE);
  console.log('location', LOCATION);
  console.groupEnd();
};
