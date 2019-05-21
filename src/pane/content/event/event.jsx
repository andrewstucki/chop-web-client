// @flow
import React from 'react';
import Chat from '../chat';
import Offline from '../offline';
import ChatDisabled from '../chatDisabled';

type EventPropsType = {
  isOffline: boolean,
  isChatEnabled: boolean,
  channel: string,
};

const Event = ({isOffline, isChatEnabled, channel}: EventPropsType) => {
  if (isOffline) {
    return (
      <Offline/>
    );
  } else if (isChatEnabled) {
    return (
      <Chat channel={channel}/>
    );
  } else {
    return (
      <ChatDisabled />
    );
  }
};

export default React.memo < EventPropsType > (Event);
