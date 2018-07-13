// @flow
import React from 'react';

import {
  Message,
  MESSAGE,
  Notification,
  ActionableNotification,
  Text,
} from './index';
import { NOTIFICATION } from './notification/dux';
import { ACTIONABLE_NOTIFICATION } from './actionableNotification/dux';
import { BASIC_TEXT } from './text/dux';
import { PUBLISH_MOMENT_TO_CHANNEL } from './dux';

import AnchorMoment from '../placeholder/anchorMoment';

import { ANCHOR_MOMENT } from '../placeholder/anchorMoment/dux';

import type { MomentType } from './dux';

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
  case PUBLISH_MOMENT_TO_CHANNEL: {
    switch (data.moment.type) {
    case NOTIFICATION:
      return (
        <Notification
          notification={data.moment}
        />
      );
    case ACTIONABLE_NOTIFICATION:
      return (
        <ActionableNotification
          notification={data.moment}
        />
      ); 
    }
    break;
  }
  case ANCHOR_MOMENT: {
    return (
      <AnchorMoment
        anchorMoment={data}
        anchorMomentAnchored={false}
      />
    );
  }
  case BASIC_TEXT:
    return (
      <Text
        text={data}
      />
    );
  }
};

export default Moment;
