const mockDate = date => {
  const RealDate = Date;
  global.Date = class extends RealDate {
    constructor () {
      super();
      return new RealDate(date);
    }

    static now () {
      return date;
    }
  };
};

const promisifyMiddleware = ({dispatch, getState}) => next => action => {
  return new Promise( (resolve) => resolve(next(action)) )
};

export { mockDate, promisifyMiddleware };
