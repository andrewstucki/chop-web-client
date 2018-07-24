// flow
import { combineReducers } from 'redux';

import type { MessageType } from './message/dux';
import type { NotificationType } from './notification/dux';
import type { AnchorMomentType } from '../placeholder/anchorMoment/dux';
import type { ActionableNotificationType } from './actionableNotification/dux';
import type { TextType } from './text/dux';
import type { AvatarMomentType } from './avatarMoment/dux';

import messageReducer from './message/dux';
import actionableNotificationReducer from './actionableNotification/dux';

// Type Declarations

const PUBLISH_MOMENT_TO_CHANNEL = 'PUBLISH_MOMENT_TO_CHANNEL';

type PublishMomentToChannelType = {
  type: 'PUBLISH_MOMENT_TO_CHANNEL',
  channel: string,
  moment: MomentType,
};

type MomentType =
  | MessageType
  | NotificationType
  | ActionableNotificationType
  | TextType
  | AnchorMomentType
  | AvatarMomentType;

// Reducer

const reducer = combineReducers(
  {
    message: messageReducer,
    actionableNotification: actionableNotificationReducer,
  }
);

// Exports

export type {
  MomentType,
  PublishMomentToChannelType,
};

export {
  PUBLISH_MOMENT_TO_CHANNEL,
};

export default reducer;
