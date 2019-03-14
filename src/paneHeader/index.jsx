// @flow
import React from 'react';
import ChatHeader, { CHAT_HEADER} from './chatHeader';
import type { ChatHeaderType } from './chatHeader';
import DirectChatHeader, { DIRECT_CHAT_HEADER} from './directChatHeader';
import type { DirectChatHeaderType } from './directChatHeader';
import TabHeader, { TAB_HEADER} from './tabHeader';
import type { TabHeaderType } from './tabHeader';

type PaneHeaderProps =
  | ChatHeaderType
  | DirectChatHeaderType
  | TabHeaderType;

const PaneHeader = (pane: PaneHeaderProps) => {
  switch (pane.type) {
    case CHAT_HEADER: {
      const { title, subtitle } = pane.data;
      return <ChatHeader title={title} subtitle={subtitle} />;
    }
    case DIRECT_CHAT_HEADER: {
      const { otherUsersName, leaveChannel } = pane.data;
      return <DirectChatHeader otherUsersName={otherUsersName} leaveChannel={leaveChannel} />;
    }
    case TAB_HEADER: {
      const { title, hideTab } = pane.data;
      return <TabHeader title={title} hideTab={hideTab} />;
    }
    default:
      return null;
  }
};

export default React.memo < PaneHeaderProps > (PaneHeader);
