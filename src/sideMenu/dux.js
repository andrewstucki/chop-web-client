// @flow

// Actions
const CLOSE_MENU = 'CLOSE_MENU';
const OPEN_MENU = 'OPEN_MENU';
const LOGOUT = 'LOGOUT';

// Flow Types
type SideMenuStateType = {
  closed: boolean,
};

type CloseMenuType = {
  type: 'CLOSE_MENU',
};

type OpenMenuType = {
  type: 'OPEN_MENU',
};

type LogoutType = {
  type: 'LOGOUT',
};

type SideMenuActionType =
  | CloseMenuType
  | OpenMenuType;

// Action Creators
const closeMenu = () => (
  {
    type: CLOSE_MENU,
  }
);

const openMenu = () => (
  {
    type: OPEN_MENU,
  }
);

const logout = () => (
  {
    type: LOGOUT,
  }
);

// Reducer
const defaultState = {
  closed: true,
};

const reducer = (
  state: SideMenuStateType = defaultState,
  action?: SideMenuActionType
) => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case CLOSE_MENU:
    return {
      ...state,
      closed: true,
    };
  case OPEN_MENU:
    return {
      ...state,
      closed: false,
    };
  default:
    return state;
  }
};

// Exports
export default reducer;
export {
  OPEN_MENU,
  CLOSE_MENU,
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