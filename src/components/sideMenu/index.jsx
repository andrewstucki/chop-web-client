// @flow
/* global SyntheticMouseEvent, React$Node */
import React from 'react';
import styles from './style.css';
import closeX from '../../../assets/closeX.svg';
import ReactTouchEvents from "react-touch-events";

type SideMenuType = {
  children?: React$Node | Array<React$Node>,
  close: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  isClosed: boolean,
  swipe?:  (event: SyntheticTouchEvent<HTMLButtonElement>) => void,
}

const SideMenu = (
  {
    children,
    close,
    isClosed,
    swipe,
  }: SideMenuType) => {
  const wrapperClass = isClosed ? styles.closed : styles.open;
  return (
    <div className={wrapperClass}>
      <div
        onClick={close}
        className={styles.overlay}
      ></div>
      <ReactTouchEvents
        onSwipe={ swipe }
      >
        <div className={styles.container}>
          {children}
        </div>
      </ReactTouchEvents>
    </div>
  );
};

export default SideMenu;