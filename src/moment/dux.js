// flow
import type { MessageType } from './message/dux';
import type { NotificationType } from './notification/dux';
import type { AnchorMomentType } from '../placeholder/anchorMoment/dux';
import type { ActionableNotificationType } from './actionableNotification/dux';
import type { TextType } from './text/dux';
import type { AvatarMomentType } from './avatarMoment/dux';

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


// Exports

export type {
  MomentType,
  PublishMomentToChannelType,
};

export {
  PUBLISH_MOMENT_TO_CHANNEL,
};
