// @flow
import type { ToggleChatFocusAction } from '../../chat/dux';
import { TOGGLE_CHAT_FOCUS } from '../../chat/dux';

type DomStateType = {};
type DomActionType = 
  | ToggleChatFocusAction;

const defaultState = {};

const reducer = (
  state: DomStateType = defaultState,
  action?: DomActionType,
) => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case TOGGLE_CHAT_FOCUS:
    if (action.focus) {
      setTimeout(() => {
        if (document.body) {
          document.body.style.height = window.innerHeight + 'px';
          document.body.scrollTop = 0;
        }
      }, 150);
    } else {
      if (document.body) {
        document.body.style.height = '100%';
        document.body.scrollTop = 0;
      }
    }
    return state;
  default:
    return state;
  }
};

export default reducer;
export {
  defaultState,
};