// @flow
/* global SyntheticMouseEvent, React$Node, SyntheticTouchEvent */
import React, { useRef } from 'react';
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

const Menu = ({swipe, isClosed, children}) => {
  const menuRef = useRef();

  return (
    <ReactTouchEvents onSwipe={swipe}>
      <div
        className={isClosed ? styles.menuClosed : styles.menuOpen}
        ref={menuRef}
        onTransitionEnd={() => {
          if (menuRef.current && isClosed) {
            menuRef.current.scrollTop = 0;
          }
        }}
      >{children}</div>
    </ReactTouchEvents>
  );
};

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

SideMenu.whyDidYouRender = true;

export default React.memo < SideMenuType > (SideMenu);
