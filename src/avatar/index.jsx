import React from 'react';
import InitialAvatar from './initialAvatar';
import ImageAvatar from './imageAvatar';

const Avatar = ({user, large}) => {
  if (user.avatarUrl && user.avatarUrl.indexOf('missing.png') === -1) {
    return (
      <ImageAvatar url={user.avatarUrl} large={large} />
    );
  } else {
    return (
      <InitialAvatar name={user.name} large={large} />
    );
  }
};

export default Avatar;
