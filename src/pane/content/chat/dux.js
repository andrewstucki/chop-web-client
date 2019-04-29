//@flow
import { SET_PANE_CONTENT } from '../../dux';

const CHAT = 'CHAT';

type ChatPaneType = {
  type: typeof CHAT,
  content: {
    channelId: string,
    animate: boolean,
  },
};

const setPaneToChat = (name: string, channelId: string, animate: boolean = true) => (
  {
    type: SET_PANE_CONTENT,
    name,
    pane: {
      type: CHAT,
      content: {
        channelId,
        animate,
      },
    },
  }
);

export {
  setPaneToChat,
  SET_PANE_CONTENT,
  CHAT,
};

export type {
  ChatPaneType,
};
