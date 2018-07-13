// import { createUid } from '../../src/chat/dux';

const mockDate = date => {
  const RealDate = Date;
  global.Date = class extends RealDate {
    constructor () {
      super();
      return new RealDate(date);
    }
  };
};

// const mockCreateUid = id => {
//   const RealCreateUid = createUid();
//   global.createUid = class extends RealCreateUid {
//     constructor () {
//       super();
//       return new RealCreateUid() = id;
//     }
//   };
// };

export { mockDate };
