import { Magic } from 'magic-sdk';

const createMagic = (key:string) => {
  //Delete testMode to use the Magic site for user authentication
  return typeof window != 'undefined' && new Magic(key,{testMode:true});
};

export const magic = createMagic('magicPublicKey') as Magic;