// @flow
import React from 'react';
import InitialAvatar from './initialAvatar';
import ImageAvatar from './imageAvatar';
import type { SharedSubscriberType } from '../subscriber/dux';

type AvatarProps = {
  subscriber: SharedSubscriberType,
  large?: boolean,
  small?: boolean,
  id?: string,
};

const Avatar = ({subscriber, large = false, small = false, id = ''}:AvatarProps) => {
  if (subscriber.avatar && subscriber.avatar.indexOf('missing.png') === -1) {
    return (
      <ImageAvatar url={subscriber.avatar} large={large} small={small} id={id}/>
    );
  } else {
    return (
      <InitialAvatar nickname={subscriber.nickname} large={large} small={small} id={id}/>
    );
  }
};

export default React.memo < AvatarProps > (Avatar);
