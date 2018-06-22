// @flow
/* global React$Node */

// Type Definitions

const NOTIFICATION = 'NOTIFICATION';

type NotificationType = {
  type: 'NOTIFICATION',
  children: React$Node | Array<React$Node>,
  timeStamp: string,
};

export type {
  NotificationType,
};
