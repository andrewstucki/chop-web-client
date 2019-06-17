// @flow

const getResetToken = () => {
  const searchParams = new URLSearchParams(global.location.search);
  if (searchParams.has('reset_token')) {
    const token = searchParams.get('reset_token');
    return token;
  } else {
    return null;
  }
};

export {
  getResetToken,
};