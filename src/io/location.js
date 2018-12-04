export default class Location {
  hostname () {
    if (global.location.hostname === '0.0.0.0' || global.location.hostname === 'localhost') {
      //return 'digerati.chopdev.com';
      return 'gracebiblechurch.chopdev.com';
    } else {
      return global.location.hostname;
    }
  }
}
