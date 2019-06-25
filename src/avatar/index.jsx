// @flow
import React from 'react';
import InitialAvatar from './initialAvatar';
import ImageAvatar from './imageAvatar';
import AvatarLoader from './avatarLoader';
import type { SharedSubscriberType } from '../subscriber/dux';

export type AvatarSizeType = 'small' | 'medium' | 'large' | 'xlarge';

type AvatarProps = {|
  subscriber: SharedSubscriberType,
  size: AvatarSizeType,
  id?: string,
  loading?: boolean,
|};

const Avatar = ({subscriber, size = 'medium', id = '', loading = false}:AvatarProps) => {
  if (subscriber.avatar && subscriber.avatar.indexOf('missing.png') === -1) {
    return (
      <>
        { loading && <AvatarLoader size={size} />}
        <ImageAvatar url={subscriber.avatar} size={size} id={id}/>
      </>
    );
  } else {
    return (
      <>
        { loading && <AvatarLoader size={size} />}
        <InitialAvatar nickname={subscriber.nickname} size={size} id={id}/>
      </>
    );
  }
};

export default React.memo < AvatarProps > (Avatar);
