import React from 'react';
import styles from './style.css';

const ImageAvatar = ({url}) => (
  <div
    className={styles.icon}
    style={{backgroundImage: `url(${url})`, backgroundSize: '36px 36px'}}
  >
  </div>
);

export default ImageAvatar;