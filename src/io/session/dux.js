// @flow
import type { LogoutType } from '../../sideMenu/dux';
import { LOGOUT } from '../../sideMenu/dux';

type SessionActionType =
  | LogoutType;

const reducer = (
  state: Object = {},
  action?: SessionActionType
) => {
  if (!action || !action.type) {
    return state;
  }
  switch(action.type) {
  case LOGOUT:
    window.location.assign('https://live.life.church/sessions/sign_out');
  default:
    return state;
  }

}

export default reducer;