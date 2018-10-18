export default class Cookies {
  legacyToken () {
    return global.document.cookie.replace(/(?:(?:^|.*;\s*)legacy_token\s*=\s*([^;]*).*$)|^.*$/, '$1');
  }
}