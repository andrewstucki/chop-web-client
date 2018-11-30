//@flow
import { SET_PANE_CONTENT } from '../../dux';

const CHAT = 'CHAT';

type ChatType = {
  type: 'CHAT',
  channelId: string,
};

const setPaneToChat = (name: string, channelId: string) => (
  {
    type: SET_PANE_CONTENT,
    name,
    content: {
      type: CHAT,
      channelId,
    },
  }
);

export {
  setPaneToChat,
  SET_PANE_CONTENT,
  CHAT,
};

export type {
  ChatType,
};
