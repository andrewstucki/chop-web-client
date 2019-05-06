// flow
import type { MessageType } from './message/dux';
import type { NotificationType } from './notification/dux';
import type { AnchorMomentType } from '../anchorMoment/dux';
import type { ActionableNotificationType } from './actionableNotification/dux';

// Action Types

const PUBLISH_MOMENT_TO_CHANNEL = 'PUBLISH_MOMENT_TO_CHANNEL';
const RECEIVE_MOMENT = 'RECEIVE_MOMENT';
const ADD_MOMENT_TO_CHANNEL = 'ADD_MOMENT_TO_CHANNEL';

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
};

type AddMomentToChannelType = {
  type: typeof ADD_MOMENT_TO_CHANNEL,
  channel: string,
  moment: MomentType,
};

type MomentType =
  | MessageType
  | NotificationType
  | ActionableNotificationType
  | AnchorMomentType;


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

const addMomentToChannel = (
  channel: string,
  moment: MomentType
): AddMomentToChannelType => (
  {
    type: ADD_MOMENT_TO_CHANNEL,
    channel,
    moment,
  }
);


// Exports

export type {
  MomentType,
  PublishMomentToChannelType,
  ReceiveMomentType,
  AddMomentToChannelType,
};

export {
  PUBLISH_MOMENT_TO_CHANNEL,
  RECEIVE_MOMENT,
  ADD_MOMENT_TO_CHANNEL,
};

export {
  receiveMoment,
  addMomentToChannel,
};
