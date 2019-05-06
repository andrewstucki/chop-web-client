// @flow
import React from 'react';

import {
  Message,
  MESSAGE,
  Notification,
  ActionableNotification,
} from './index';
import { NOTIFICATION } from './notification/dux';
import { ACTIONABLE_NOTIFICATION } from './actionableNotification/dux';
import AnchorMoment from '../anchorMoment';
import { ANCHOR_MOMENT } from '../anchorMoment/dux';
import type { MomentType } from './dux';

type MomentPropType = {
  currentChannel: string,
  data: MomentType,
  isCompact: boolean,
};

class Moment extends React.Component<MomentPropType> {
  render () {
    const { currentChannel, data, isCompact } = this.props;
    switch (data.type) {
      case MESSAGE:
        if (!data.text) {
          return null;
        } else {
          return (
            <Message
              currentChannel={currentChannel}
              message={data}
              isCompact={isCompact}
            />
          );
        }
      case NOTIFICATION:
        return (
          <Notification
            notification={data}
            isCompact={isCompact}
          />
        );
      case ACTIONABLE_NOTIFICATION:
        return (
          <ActionableNotification
            notification={data}
            isCompact={isCompact}
          />
        );
      case ANCHOR_MOMENT:
        return (
          <AnchorMoment
            anchorMoment={data}
            isAnchorMomentAnchored={false}
          />
        );
      default:
        return null;
    }
  }
}

export default React.memo < MomentType > (Moment);
