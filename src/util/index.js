const getFirstInitial = name => (
  name.charAt(0).toUpperCase()
);

const avatarColors = [
  '100,180,242', '118,144,244', '176,117,237', '221,129,232', '247,114,146',
  '226,85,82',   '246,125,66',  '255,172,72',  '255,201,72',  '252,219,81',
  '233,228,91',  '176,221,97',  '127,198,97',  '91,214,154',  '115,226,225',
];

const getAvatarColor = (nickname: string, opacity?: number) => {
  const op = opacity || '1.0';
  const numberDigest = djb2Hash(nickname); 
  const numberOfColors = avatarColors.length; 
  const index = Math.abs(numberDigest % numberOfColors); 
  const color = avatarColors[index];
  return `rgba(${color}, ${op})`; 
};

const djb2Hash = str => {
  let hash = 5381;
  for (const char in str) { 
    const charCode = char.charCodeAt(0); 
    hash = (hash << 5) + hash + charCode; 
  }
  return hash;
};

// U stands for unique
const createUid = () => {
  let seed = new Date().getTime(); // Used to insure more randomness
  const regEx = /[xy]/g;
  const replacer = char => {
    const randomNumber = (seed + Math.random() * 16) % 16 | 0;
    seed = Math.floor(seed / 16); // Update Seed
    return (char === 'x' ? randomNumber : (randomNumber & 0x3 | 0x8)).toString(16);
  };
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(regEx, replacer);
};

export {
  getFirstInitial,
  getAvatarColor,
  createUid,
};
