// @flow
import React from 'react';
import { Icon } from './styles';
import { getFirstInitial, getAvatarColor } from '../util';

type InitialAvatarProps = {
  nickname: string,
  large: boolean,
  small: boolean,
  id: string,
};

const InitialAvatar = ({nickname, large, small, id}:InitialAvatarProps) => (
  <Icon
    large={large}
    small={small}
    style={{backgroundColor: getAvatarColor(nickname)}}
    data-testid={id}
  >
    {getFirstInitial(nickname)}
  </Icon>
);

export default React.memo < InitialAvatarProps > (InitialAvatar);
