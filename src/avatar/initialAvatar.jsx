// @flow
import React from 'react';
import { Icon } from './styles';
import { getFirstInitial, getAvatarColor } from '../util';
import type { AvatarSizeType } from './index';

type InitialAvatarProps = {
  nickname: string,
  size: AvatarSizeType,
  id: string,
};

const InitialAvatar = ({nickname, size, id}:InitialAvatarProps) => (
  <Icon
    size={size}
    style={{backgroundColor: getAvatarColor(nickname)}}
    data-testid={id}
  >
    {getFirstInitial(nickname)}
  </Icon>
);

export default React.memo < InitialAvatarProps > (InitialAvatar);
