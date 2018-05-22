import React from 'react';
import styles from './style.css';

const SideMenu = ({children, close}) => (
  <div className={styles.wrapper}>
    <button
      className={styles.closeButton}
      onClick={close}>X</button>
    <div className={styles.container}>
      {children}
    </div>
  </div>
)

export default SideMenu;