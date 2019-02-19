import React from 'react';
import { Icon } from './styles';

const ImageAvatar = ({url, large}) => (
  <Icon
    large={large}
    style={{backgroundImage: `url(${url})`, backgroundSize: 'cover'}}
  >
  </Icon>
);

export default ImageAvatar;
