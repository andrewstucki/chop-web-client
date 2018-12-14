import type { SubscriberType } from '../feed';
import createDOMPurify from 'dompurify';
import moment from 'moment';

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

const isEmpty = (string: string) =>
  (!string || string.length === 0);

const DOMPurify = createDOMPurify();

const sanitizeConfig = {
  ADD_ATTR: ['target'],
};

const sanitizeString = (string: string, config:any = sanitizeConfig) => 
  DOMPurify.sanitize(string, config)
;

const UTC_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss ZZ';
const EPOCH_DATE_FORMAT = 'x';

const getMessageTimestamp = (timestamp: string = moment().format(UTC_DATE_FORMAT)) => {
  const isEpoch = timestamp.toString().match(/^\d{10}$/);
  let time = timestamp;

  if (isEpoch) {
    time = parseInt(time) * 1000;
  }

  const inputFormat = isEpoch ? EPOCH_DATE_FORMAT : UTC_DATE_FORMAT;
  const date = moment(time, inputFormat);
  const format = moment().diff(date, 'days') === 0 ? 'h:mma' : 'h:mma, MMMM D';
  return date.format(format);
};

const isMobileDevice = () => { /* eslint-disable */
  let check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
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
  isEmpty,
  sanitizeString,
  getMessageTimestamp,
  UTC_DATE_FORMAT,
  isMobileDevice,
};
