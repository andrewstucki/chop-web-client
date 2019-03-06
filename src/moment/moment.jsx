// @flow
import React from 'react';

import {
  Message,
  MESSAGE,
  Notification,
  ActionableNotification,
  Text,
  AvatarMoment,
} from './index';
import { NOTIFICATION } from './notification/dux';
import { ACTIONABLE_NOTIFICATION } from './actionableNotification/dux';
import { BASIC_TEXT } from './text/dux';
import { AVATAR_MOMENT } from './avatarMoment/dux';
import AnchorMoment from '../anchorMoment';
import { ANCHOR_MOMENT } from '../anchorMoment/dux';
import type { MomentType } from './dux';

type MomentPropType = {
  data: MomentType,
};

class Moment extends React.Component<MomentPropType> {
  render () {
    const { data } = this.props;
    switch (data.type) {
      case MESSAGE:
        if (!data.text) {
          return null;
        } else {
          return (
            <Message
              message={data}
            />
          );
        }
      case NOTIFICATION:
        return (
          <Notification
            notification={data}
          />
        );
      case ACTIONABLE_NOTIFICATION:
        return (
          <ActionableNotification
            notification={data}
          />
        );
      case AVATAR_MOMENT:
        return (
          <AvatarMoment
            avatarMoment={data}
          />
        );
      case ANCHOR_MOMENT:
        return (
          <AnchorMoment
            anchorMoment={data}
            isAnchorMomentAnchored={false}
          />
        );
      case BASIC_TEXT:
        return (
          <Text
            text={data}
          />
        );
      default:
        return null;
    }
  }
}

export default React.memo < MomentType > (Moment);
