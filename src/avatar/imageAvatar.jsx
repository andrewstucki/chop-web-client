import React from 'react';
import styles from './style.css';

const ImageAvatar = ({url}) => (
  <div
    className={styles.icon}
    style={{backgroundImage: `url(${url})`, backgroundSize: 'cover'}}
  >
  </div>
);

export default ImageAvatar;