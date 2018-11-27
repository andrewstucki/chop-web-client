// @flow
import { createUid } from '../util';

const ADD_ERROR = 'ADD_ERROR';
const REMOVE_ERROR = 'REMOVE_ERROR';
const CLEAR_ERRORS = 'CLEAR_ERRORS';

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
};

type ClearErrorsType = {
  type: 'CLEAR_ERRORS',
};

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

const clearErrors = (): ClearErrorsType => (
  {
    type: CLEAR_ERRORS,
  }
);

export {
  ADD_ERROR,
  REMOVE_ERROR,
  CLEAR_ERRORS,
  addError,
  removeError,
  clearErrors,
};

export type {
  ErrorType,
  AddErrorType,
  RemoveErrorType,
  ClearErrorsType,
};