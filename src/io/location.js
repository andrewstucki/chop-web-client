// @flow
const hostname = (): string => {
  const { hostname, hash } = global.location;
  if (
    // Localhost, IP Address, or Review Apps
    hostname === 'localhost' ||
    hostname.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/) ||
    hostname.indexOf('.churchonline.us') > -1
  ) {
    if (hash.length > 1) {
      return hash.substr(1); // First character in hash is always '#'
    } else {
      return 'gracebiblechurch.chopdev.com';
    }
  } else {
    return global.location.hostname;
  }
};

export {
  hostname,
};
