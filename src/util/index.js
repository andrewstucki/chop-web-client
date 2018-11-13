import type { SubscriberType } from '../feed';

const getFirstInitial = name => (
  name.charAt(0).toUpperCase()
);

function avatarImageExists (userId) {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      resolve(true);
    };
    image.onerror = () => {
      resolve(false);
    };
    image.src = `https://chop-v3-media.s3.amazonaws.com/users/avatars/${userId}/thumb/photo.jpg`;
  });
}

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

const isUsingIPad = () => 
  !!navigator.platform && /iPad/.test(navigator.platform);

const isUsingIPhone = () =>
  !!navigator.platform && /iPhone/.test(navigator.platform);

// using info from https://51degrees.com/blog/device-detection-for-apple-iphone-and-ipad
const isUsingIPhoneX = () =>
  (window.screen.height === 812 && window.screen.width === 375 && window.devicePixelRatio === 3);

// 6/6s/7/8
const isUsingIPhone678 = () => 
  (window.screen.height === 667 && window.screen.width === 375 && window.devicePixelRatio === 2);

// iPhone 6+/6s+/7+/8+
const isUsingIPhone678plus = () =>
  (window.screen.height === 736 && window.screen.width === 414 && window.devicePixelRatio === 3);

const convertSubscribersToSharedUsers = (subscribers: Array<SubscriberType>) => {
  let users = [];

  if (subscribers && subscribers.length) {
    users = subscribers.map(person => (
      {
        avatarUrl: person.avatar,
        name: person.nickname,
        pubnubToken: person.pubnubToken,
      }
    ));
  }

  return users;
};

const capitalizeFirstLetter = (string: string) => 
  (string.charAt(0).toUpperCase() + string.slice(1));
const objectFilter = (obj, predicate) => {
  const result = {};
  Object.keys(obj).forEach(key => {
    if (obj.hasOwnProperty(key) && !predicate(key, obj[key])) {
      result[key] = obj[key];
    }
  });
  return result;
};

export {
  getFirstInitial,
  getAvatarColor,
  createUid,
  avatarImageExists,
  isUsingIPad,
  isUsingIPhone,
  isUsingIPhoneX,
  isUsingIPhone678,
  isUsingIPhone678plus,
  convertSubscribersToSharedUsers,
  capitalizeFirstLetter,
  objectFilter,
};
