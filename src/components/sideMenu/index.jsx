// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import styles from './style.css';
import closeX from '../../../assets/closeX.svg';

type SideMenuType = {
  children?: React$Node | Array<React$Node>,
  close: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  isClosed: boolean,
}

const SideMenu = ({children, close, isClosed}: SideMenuType) => {
  const wrapperClass = isClosed ? styles.closed : styles.open;
  return (
    <div className={wrapperClass}>
      <button
        className={styles.closeButton}
        onClick={close}
        dangerouslySetInnerHTML={{ __html: closeX }} />
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
};

export default SideMenu;