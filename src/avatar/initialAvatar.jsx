// @flow
import React from 'react';
import { Icon } from './styles';
import { getFirstInitial, getAvatarColor } from '../util';

type InitialAvatarProps = {
  name: string,
  large: boolean,
};

const InitialAvatar = ({name, large}:InitialAvatarProps) => (
  <Icon
    large={large}
    style={{backgroundColor: getAvatarColor(name)}}
  >
    {getFirstInitial(name)}
  </Icon>
);

export default React.memo < InitialAvatarProps > (InitialAvatar);
