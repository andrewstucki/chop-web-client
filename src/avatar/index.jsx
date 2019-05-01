// @flow
import React from 'react';
import InitialAvatar from './initialAvatar';
import ImageAvatar from './imageAvatar';
import type { SharedUserType } from '../users/dux';

type AvatarProps = {
  user: SharedUserType,
  large?: boolean,
};

const Avatar = ({user, large = false}:AvatarProps) => {
  if (user.avatar && user.avatar.indexOf('missing.png') === -1) {
    return (
      <ImageAvatar url={user.avatar} large={large} />
    );
  } else {
    return (
      <InitialAvatar name={user.name} large={large} />
    );
  }
};

export default React.memo < AvatarProps > (Avatar);
