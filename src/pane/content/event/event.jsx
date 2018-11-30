import React from 'react';
import Chat from '../chat';
import Offline from '../offline';

const Event = ({isOffline, channel}) => {
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

export default Event;
