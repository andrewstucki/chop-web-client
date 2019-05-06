// @flow
import React from 'react';
import { Icon } from './styles';
import { getFirstInitial, getAvatarColor } from '../util';

type InitialAvatarProps = {
  name: string,
  large: boolean,
  small: boolean,
  id: string,
};

const InitialAvatar = ({name, large, small, id}:InitialAvatarProps) => (
  <Icon
    large={large}
    small={small}
    style={{backgroundColor: getAvatarColor(name)}}
    data-testid={id}
  >
    {getFirstInitial(name)}
  </Icon>
);

export default React.memo < InitialAvatarProps > (InitialAvatar);
