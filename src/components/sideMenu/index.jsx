// @flow
/* global SyntheticMouseEvent, React$Node, SyntheticTouchEvent */
import React from 'react';
import styles from './style.css';
import ReactTouchEvents from 'react-touch-events';

type SideMenuType = {
  children?: React$Node,
  close: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  isClosed: boolean,
  swipe?:  (event: SyntheticTouchEvent<HTMLButtonElement>) => void,
};

const Overlay = ({close, isClosed}) => (
  <div onClick={close} className={isClosed ? styles.overlayClosed : styles.overlayOpen}></div>
);

const Menu = ({swipe, isClosed, children}) => (
  <ReactTouchEvents onSwipe={ swipe }>
    <div className={isClosed ? styles.menuClosed : styles.menuOpen}>{children}</div>
  </ReactTouchEvents>
);

const SideMenu = (
  {
    children,
    close,
    isClosed,
    swipe,
  }: SideMenuType) => (
  <React.Fragment>
    <Overlay close={close} isClosed={isClosed} />
    <Menu swipe={swipe} isClosed={isClosed}>
      {children}
    </Menu>
  </React.Fragment> 
);

export default SideMenu;
