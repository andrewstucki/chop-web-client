// @flow
import React from 'react';
import { Icon } from './styles';

type ImageAvatarProps = {
  url: string,
  large: boolean,
};

const ImageAvatar = ({url, large}:ImageAvatarProps) => (
  <Icon
    large={large}
    style={{backgroundImage: `url(${url})`, backgroundSize: 'cover'}}
  >
  </Icon>
);

export default React.memo < ImageAvatarProps > (ImageAvatar);
