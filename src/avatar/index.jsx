// @flow
import React from 'react';
import InitialAvatar from './initialAvatar';
import ImageAvatar from './imageAvatar';
import type { SharedUserType } from '../users/dux';

type AvatarProps = {
  user: SharedUserType,
  large?: boolean,
  small?: boolean,
  id?: string,
};

const Avatar = ({user, large = false, small = false, id = ''}:AvatarProps) => {
  if (user.avatar && user.avatar.indexOf('missing.png') === -1) {
    return (
      <ImageAvatar url={user.avatar} large={large} small={small} id={id}/>
    );
  } else {
    return (
      <InitialAvatar name={user.name} large={large} small={small} id={id}/>
    );
  }
};

export default React.memo < AvatarProps > (Avatar);
