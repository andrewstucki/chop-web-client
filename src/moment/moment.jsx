// @flow
import React from 'react';

import {
  Message,
  MESSAGE,
  Notification,
} from './index';

import { PUBLISH_MOMENT_TO_CHANNEL } from './dux';

import type {
  MomentType,
} from './dux';

type MomentPropType = {
  data: MomentType,
};

const Moment = ({data}: MomentPropType) => {
  switch (data.type) {
  case MESSAGE:
    return (
      <Message
        message={data}
      />
    );
  case PUBLISH_MOMENT_TO_CHANNEL:
    return (
      <Notification
        notification={data.moment}
      />
    );
  }
};

export default Moment;
