export default class LegacyToken {
  get () {
    const cookieToken = global.document.cookie.replace(/(?:(?:^|.*;\s*)legacy_token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (typeof cookieToken === 'string' && cookieToken) {
      return cookieToken;
    } else {
      return global.location.search.replace(/legacy_token=([^&]*)/, '$1');
    }
  }
}