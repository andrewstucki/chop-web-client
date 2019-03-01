// @flow
import React from 'react';
import InitialAvatar from './initialAvatar';
import ImageAvatar from './imageAvatar';
import type { SharedUserType } from '../feed/dux';

type AvatarProps = {
  user: SharedUserType,
  large?: boolean,
};

const Avatar = ({user, large = false}:AvatarProps) => {
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

export default React.memo < AvatarProps > (Avatar);
