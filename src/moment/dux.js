// flow
import type { MessageType } from './message/dux';
import type { NotificationType } from './notification/dux';
import type { AnchorMomentType } from '../anchorMoment/dux';
import type { ActionableNotificationType } from './actionableNotification/dux';
import type { TextType } from './text/dux';
import type { AvatarMomentType } from './avatarMoment/dux';

// Action Types

const PUBLISH_MOMENT_TO_CHANNEL = 'PUBLISH_MOMENT_TO_CHANNEL';
const RECEIVE_MOMENT = 'RECEIVE_MOMENT';

// Flow Type Definitions

type PublishMomentToChannelType = {
  type: 'PUBLISH_MOMENT_TO_CHANNEL',
  hostChannel: string,
  moment: MomentType,
};

type ReceiveMomentType = {
  type: 'RECEIVE_MOMENT',
  channel: string,
  moment: MomentType,
}

type MomentType =
  | MessageType
  | NotificationType
  | ActionableNotificationType
  | TextType
  | AnchorMomentType
  | AvatarMomentType;


const receiveMoment = (
  channel: string,
  moment: MomentType
): ReceiveMomentType => (
  {
    type: RECEIVE_MOMENT,
    channel,
    moment,
  }
);


// Exports

export type {
  MomentType,
  PublishMomentToChannelType,
  ReceiveMomentType,
};

export {
  PUBLISH_MOMENT_TO_CHANNEL,
  RECEIVE_MOMENT,
};

export {
  receiveMoment,
};
