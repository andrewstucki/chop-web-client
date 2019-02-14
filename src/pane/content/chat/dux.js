//@flow
import { SET_PANE_CONTENT } from '../../dux';

const CHAT = 'CHAT';

type ChatPaneType = {
  type: typeof CHAT,
  content: {
    channelId: string,
  },
};

const setPaneToChat = (name: string, channelId: string) => (
  {
    type: SET_PANE_CONTENT,
    name,
    pane: {
      type: CHAT,
      content: {
        channelId,
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
