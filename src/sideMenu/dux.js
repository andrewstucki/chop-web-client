// @flow

// Action Types

const CLOSE_SIDE_MENU = 'CLOSE_SIDE_MENU';
const OPEN_SIDE_MENU = 'OPEN_SIDE_MENU';
const LOGOUT = 'LOGOUT';

// Flow Type Definitions

type CloseMenuType = {
  type: 'CLOSE_SIDE_MENU',
};

type OpenMenuType = {
  type: 'OPEN_SIDE_MENU',
};

type LogoutType = {
  type: 'LOGOUT',
};

// Action Creators

const closeMenu = (): CloseMenuType => (
  {
    type: CLOSE_SIDE_MENU,
  }
);

const openMenu = (): OpenMenuType => (
  {
    type: OPEN_SIDE_MENU,
  }
);

const logout = (): LogoutType => (
  {
    type: LOGOUT,
  }
);

// Exports

export {
  OPEN_SIDE_MENU,
  CLOSE_SIDE_MENU,
  LOGOUT,
};

export type {
  OpenMenuType,
  CloseMenuType,
  LogoutType,
};

export {
  closeMenu,
  openMenu,
  logout,
};
