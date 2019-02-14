//@flow
import { SET_PANE_CONTENT } from '../../dux';

const EVENT = 'EVENT';

type EventPaneType = {
  type: typeof EVENT,
  content: {
    channelId: string,
  },
};

const setPaneToEvent = (name: string, channelId: string) => (
  {
    type: SET_PANE_CONTENT,
    name,
    pane: {
      type: EVENT,
      content: {
        channelId,
      },
    },
  }
);

export {
  EVENT,
  setPaneToEvent,
};

export type {
  EventPaneType,
};
