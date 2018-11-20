// @flow

// Action Types

const CLOSE_SIDE_MENU = 'CLOSE_SIDE_MENU';
const OPEN_SIDE_MENU = 'OPEN_SIDE_MENU';

// Flow Type Definitions

type CloseMenuType = {
  type: 'CLOSE_SIDE_MENU',
};

type OpenMenuType = {
  type: 'OPEN_SIDE_MENU',
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

const logout = (): void => 
  global.location.assign(`${global.location.origin}/sessions/sign_out`);

// Exports

export {
  OPEN_SIDE_MENU,
  CLOSE_SIDE_MENU,
};

export type {
  OpenMenuType,
  CloseMenuType,
};

export {
  closeMenu,
  openMenu,
  logout,
};
