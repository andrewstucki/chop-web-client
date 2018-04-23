// @flow

import { UPDATE_INPUT, ADD_MESSAGE_TO_CHANNEL } from './action-types';

type UpdateInputAction = {
  type: "UPDATE_INPUT",
  value: string
}

type AddMessageToChannelAction = {
  type: "ADD_MESSAGE_TO_CHANNEL",
  text: string
}


type ChatActions = 
  | UpdateInputAction
  | AddMessageToChannelAction;

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