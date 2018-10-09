import React from 'react';
import styles from './style.css';
import { getFirstInitial, getAvatarColor } from '../util';

const InitialAvatar = ({name}) => (
  <div
    className={styles.icon}
    style={{backgroundColor: getAvatarColor(name)}}
  >
    {getFirstInitial(name)}
  </div>
);

export default InitialAvatar;