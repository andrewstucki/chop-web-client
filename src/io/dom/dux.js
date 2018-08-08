// @flow
import type { ToggleChatFocusAction } from '../../chat/dux';
import { TOGGLE_CHAT_FOCUS } from '../../chat/dux';
import { CHANGE_CHANNEL } from '../../feed/dux';
import type { ChangeChannelType } from '../../feed/dux';


type DomStateType = {};

type DomActionType = 
  | ToggleChatFocusAction
  | ChangeChannelType;

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
        if (document.body && document.documentElement) {
          document.body.style.height = window.innerHeight + 'px';
          document.documentElement.style.height = window.innerHeight + 'px';
          window.scroll({
            top: 0,
            behavior: 'instant',
          });
        }
      }, 200);
    } else {
      if (document.body && document.documentElement) {
        document.body.style.height = '100%';
        document.documentElement.style.height = '100%';
        window.scroll({
          top: 0,
          behavior: 'instant',
        });
      }
    }
    return state;
  case CHANGE_CHANNEL: {
    setTimeout(() => {
      const chatBox = document.getElementById('chat-box');
      if (chatBox) {
        // $FlowFixMe
        chatBox.scroll({
          top: chatBox.scrollHeight,
          behavior: 'instant',
        });
      }
    },
    0
    );
    return state;
  }
  default:
    return state;
  }
};

export {
  defaultState,
};

export default reducer;
