export default class Location {
  hostname () {
    if (global.location.hostname === '0.0.0.0' || global.location.hostname === 'localhost') {
      return 'gracebiblechurch.churchonline.org';// 'digerati.churchonline.org';
    } else {
      return global.location.hostname;
    }
  }
}
