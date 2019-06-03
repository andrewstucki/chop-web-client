// @flow
import React from 'react';
import ChatHeader, { CHAT_HEADER, type ChatHeaderType } from './chatHeader';
import DirectChatHeader, { DIRECT_CHAT_HEADER, type DirectChatHeaderType } from './directChatHeader';
import TabHeader, { TAB_HEADER, type TabHeaderType} from './tabHeader';
import ScheduleHeader, { SCHEDULE_HEADER, type ScheduleHeaderType } from './scheduleHeader';

type PaneHeaderProps =
  | ChatHeaderType
  | DirectChatHeaderType
  | TabHeaderType
  | ScheduleHeaderType;

const PaneHeader = (pane: PaneHeaderProps) => {
  switch (pane.type) {
    case CHAT_HEADER: {
      const { title, subtitle } = pane.data;
      return <ChatHeader title={title} subtitle={subtitle} />;
    }
    case DIRECT_CHAT_HEADER: {
      const { otherSubscribersName, leaveChannel } = pane.data;
      return <DirectChatHeader otherSubscribersName={otherSubscribersName} leaveChannel={leaveChannel} />;
    }
    case TAB_HEADER: {
      const { title } = pane.data;
      return <TabHeader title={title} />;
    }
    case SCHEDULE_HEADER: {
      const { title } = pane.data;
      return <ScheduleHeader title={title} />;
    }
    default:
      return null;
  }
};

export default React.memo < PaneHeaderProps > (PaneHeader);
