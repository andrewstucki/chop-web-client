// @flow
import type { ToggleChatFocusAction, AddToCurrentChannelAction } from '../../chat/dux';
import { TOGGLE_CHAT_FOCUS } from '../../chat/dux';
import { CHANGE_CHANNEL } from '../../feed/dux';
import type { ChangeChannelType } from '../../feed/dux';


type DomStateType = {
  linkXPos: number,
  linkWidth: number,
};
type DomActionType = 
  | ToggleChatFocusAction
  | AddToCurrentChannelAction
  | ChangeChannelType;

const defaultState = {
  linkXPos: 0,
  linkWidth: 0,
};

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
    const link = document.getElementById('nav-' + action.channel);
    if (link) {
      const boundingRec = link.getBoundingClientRect();
      return {
        ...state,
        linkXPos: boundingRec.left,
        linkWidth: boundingRec.width,
      };
    }
    return state;
  }
  default:
    return state;
  }
};

// Selector
const getBarX = (state: DomStateType) => (
  state.linkXPos + 8
);

const getBarWidth = (state: DomStateType) => (
  state.linkWidth - 16
);

export {
  defaultState,
  getBarX,
  getBarWidth,
};

export default reducer;
