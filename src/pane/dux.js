//@flow
const SET_PANE_CONTENT = 'SET_PANE_CONTENT';
const CHAT = 'CHAT';

type PaneContentType = any;

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
}

export type {
  PaneContentType,
}
