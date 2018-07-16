// @flow
import React from 'react';

import { getFirstInitial, getAvatarColor } from '../../util';

import type { AvatarMomentType } from './dux';
import styles from './style.css';

type AvatarMomentPropsType = {
  avatarMoment: AvatarMomentType,
};

const AvatarMoment = ({ avatarMoment }: AvatarMomentPropsType) => (
  <div className={styles.avatarMoment}>
    <div
      className={styles.avatar}
      style={{backgroundColor: getAvatarColor(avatarMoment.user.nickname)}}
    >
      {getFirstInitial(avatarMoment.user.nickname)}
    </div>
    <div className={styles.user}>
      <strong>{avatarMoment.user.nickname}</strong>
    </div>
  </div>
);

export default AvatarMoment;
