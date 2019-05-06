// @flow
import React from 'react';
import { Icon } from './styles';

type ImageAvatarProps = {
  url: string,
  large: boolean,
  small: boolean,
  id: string,
};

const ImageAvatar = ({url, large, small, id}:ImageAvatarProps) => (
  <Icon
    large={large}
    small={small}
    style={{backgroundImage: `url(${url})`, backgroundSize: 'cover'}}
    id={id}
  >
  </Icon>
);

export default React.memo < ImageAvatarProps > (ImageAvatar);
