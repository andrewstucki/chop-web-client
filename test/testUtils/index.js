const mockDate = date => {
  const RealDate = Date;
  global.Date = class extends RealDate {
    constructor () {
      super();
      return new RealDate(date);
    }
  };
};

export { mockDate };
