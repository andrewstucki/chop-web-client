// @flow
// Action Types

export const MUTE_SUBSCRIBER = 'MUTE_SUBSCRIBER';

// Flow Type Definitions

export type MuteSubscriberType = {
  type: typeof MUTE_SUBSCRIBER,
  subscriber: string,
  channelId: string,
};

// Action Creators

export const muteSubscriberType = (
  subscriber: string,
  channelId: string,
): MuteSubscriberType => (
  {
    type: MUTE_SUBSCRIBER,
    subscriber,
    channelId,
  }
);
