// @flow
import type { ToggleChatFocusAction, AddToCurrentChannelAction } from '../../chat/dux';
import { TOGGLE_CHAT_FOCUS, ADD_TO_CURRENT_CHANNEL } from '../../chat/dux';
import { CHANGE_CHANNEL } from '../../feed/dux';

type DomStateType = {};
type DomActionType = 
  | ToggleChatFocusAction
  | AddToCurrentChannelAction;

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
  case ADD_TO_CURRENT_CHANNEL:
    setTimeout(() => {
        const chatBox = document.getElementById('chat-box');
        chatBox.scroll({
          top: chatBox.scrollHeight,
          behavior: "smooth"
        });
      },
      300
    );
    return state;
  case CHANGE_CHANNEL:
    setTimeout(() => {
        const chatBox = document.getElementById('chat-box');
        chatBox.scroll({
          top: chatBox.scrollHeight,
          behavior: "instant"
        });
      },
      .5
    );
    return state;
  default:
    return state;
  }
};

export {
  defaultState,
};

export default reducer;
