// @flow

import { UPDATE_INPUT, ADD_MESSAGE_TO_CHANNEL } from './action-types';

type UpdateInputAction = {
  type: string,
  value: string
}

type AddMessageToChannelAction = {
  type: string,
  text: string
}

type ChatActions = UpdateInputAction | AddMessageToChannelAction;

const updateInput = (value: string): UpdateInputAction => (
  {
    type: UPDATE_INPUT,
    value
  }
)

const addMessageToChannel = (text: string): AddMessageToChannelAction => (
  {
    type: ADD_MESSAGE_TO_CHANNEL,
    text
  }
)

export { updateInput, addMessageToChannel };
export type { UpdateInputAction, AddMessageToChannelAction, ChatActions };