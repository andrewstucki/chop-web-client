//@flow
import React from 'react';
import type { PaneContentType } from './dux';
import { CHAT } from './content/chat/dux';
import Chat from './content/chat';
import { EVENT } from './content/event/dux';
import Event from './content/event';

type PanePropsType = {
  type: string,
  content: PaneContentType,
};

const Pane = ({type, content}:PanePropsType) => {
  switch (type) {
  case EVENT:
    return (
      <Event />
    );
  case CHAT:
    return (
      <Chat channel={content.channelId} />
    );
  default:
    return null;
  }
};

export default Pane;
