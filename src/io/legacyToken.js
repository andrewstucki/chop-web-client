// @flow

const getLegacyToken = () => {
  const cookieToken = global.document.cookie.replace(/(?:(?:^|.*;\s*)legacy_token\s*=\s*([^;]*).*$)|^.*$/, '$1');
  if (typeof cookieToken === 'string' && cookieToken) {
    return cookieToken;
  } else {
    const searchParams = new URLSearchParams(global.location.search);
    if (searchParams.has('legacy_token')) {
      return searchParams.get('legacy_token');
    } else {
      return '';
    }
  }
};

export {
  getLegacyToken,
};