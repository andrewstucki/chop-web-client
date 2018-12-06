export default class Location {
  hostname () {
    if (global.location.hostname === '0.0.0.0' || global.location.hostname === 'localhost') {
      // return 'live.life.church';
      return 'gracebiblechurch.chopdev.com';
      // return 'digerati.chopdev.com';
    } else {
      return global.location.hostname;
    }
  }
}
