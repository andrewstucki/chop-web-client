// @flow
import React from 'react';
import Chat from '../chat';
import Offline from '../offline';

type EventPropsType = {
  isOffline: boolean,
  channel: string,
};

const Event = ({isOffline, channel}:EventPropsType) => {
  if (isOffline) {
    return (
      <Offline />
    );
  } else {
    return (
      <Chat channel={channel}/>
    );
  }
};

Event.whyDidYouRender = true;

export default React.memo < EventPropsType > (Event);
