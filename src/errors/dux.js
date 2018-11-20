// @flow
import { createUid } from '../util';

const ADD_ERROR = 'ADD_ERROR';
const REMOVE_ERROR = 'REMOVE_ERROR';

type ErrorType = {
  id: string,
  message: string,
};

type AddErrorType = {
  type: 'ADD_ERROR',
  error: ErrorType,
};

type RemoveErrorType = {
  type: 'REMOVE_ERROR',
  id: string,
}

const addError = (message: string): AddErrorType => (
  {
    type: ADD_ERROR,
    error: {
      id: createUid(),
      message,
    },
  }
);

const removeError = (id: string): RemoveErrorType => (
  {
    type: REMOVE_ERROR,
    id,
  }
);

export {
  ADD_ERROR,
  REMOVE_ERROR,
  addError,
  removeError,
};

export type {
  ErrorType,
  AddErrorType,
  RemoveErrorType,
};