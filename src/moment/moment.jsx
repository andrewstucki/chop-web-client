// flow
import React from 'react';

import {
  Message,
  MESSAGE,
  Notification,
  NOTIFICATION,
} from './index';

import type {
  MomentType,
  NotificationType,
} from './dux';

type MomentPropType = {
  data: MomentType,
};

const Moment = ({data}:MomentPropType) => {
  switch (data.type) {
  case MESSAGE:
    return (
      <Message
        message={data}
      />
    );
  case NOTIFICATION:
    return (
      <Notification
        timeStamp={data.timeStamp}
        text={data.text}
      />
    );
  }
};

export default Moment;
