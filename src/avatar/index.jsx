import React from 'react';
import InitialAvatar from './initialAvatar';
import ImageAvatar from './imageAvatar';

const Avatar = ({user}) => {
  if (user.avatarUrl !== undefined) {
    return (
      <ImageAvatar url={user.avatarUrl} />
    );
  } else {
    return (
      <InitialAvatar name={user.name} />
    );
  }
};

export default Avatar;