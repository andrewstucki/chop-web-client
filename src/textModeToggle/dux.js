// @flow

// Action Types
const COMPACT = 'COMPACT';
const COMFORTABLE = 'COMFORTABLE';

// Type Definitions

type TextModeType = 
  | typeof COMPACT
  | typeof COMFORTABLE;

// Exports

export type {
  TextModeType,
};

export {
  COMPACT,
  COMFORTABLE,
};