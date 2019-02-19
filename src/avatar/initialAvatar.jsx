import React from 'react';
import { Icon } from './styles';
import { getFirstInitial, getAvatarColor } from '../util';

const InitialAvatar = ({name, large}) => (
  <Icon
    large={large}
    style={{backgroundColor: getAvatarColor(name)}}
  >
    {getFirstInitial(name)}
  </Icon>
);

export default InitialAvatar;
