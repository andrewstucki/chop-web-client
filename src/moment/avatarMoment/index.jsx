// @flow
import React from 'react';

import { getFirstInitial, getAvatarColor } from '../../util';

import type { AvatarMomentType } from './dux';
import { Wrapper, Avatar, User } from './styles';

type AvatarMomentPropsType = {
  avatarMoment: AvatarMomentType,
};

const AvatarMoment = ({ avatarMoment }: AvatarMomentPropsType) => (
  <Wrapper>
    <Avatar
      style={{backgroundColor: getAvatarColor(avatarMoment.user.name)}}
    >
      {getFirstInitial(avatarMoment.user.name)}
    </Avatar>
    <User>
      <strong>{avatarMoment.user.name}</strong>
    </User>
  </Wrapper>
);

export default React.memo < AvatarMomentPropsType > (AvatarMoment);
