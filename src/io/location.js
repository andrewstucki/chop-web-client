// @flow

export default class Location {
  static hostname (): string {
    const { hostname, hash } = global.location;
    if (
      hostname === 'localhost' ||
      hostname.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/) // Any IP Address
    ) {
      if (hash.length > 1) {
        return hash.substr(1) // First charater in hash is always '#'
      } else {
        return 'digerati.chopdev.com';
      }
    } else {
      return global.location.hostname;
    }
  }
}
