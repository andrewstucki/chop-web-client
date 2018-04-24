// @flow
import io from '../io';

// Action Types
const UPDATE_INPUT = 'chop/chat/UPDATE_INPUT';
const ADD_MESSAGE_TO_CHANNEL = 'chop/chat/ADD_MESSAGE_TO_CHANNEL';
const SEND_MESSAGE = "chop/chat/SEND_MESSAGE";

// Flow Type Definitions
type UpdateInputAction = {
  type: "chop/chat/UPDATE_INPUT",
  value: string
}

type AddMessageToChannelAction = {
  type: "chop/chat/ADD_MESSAGE_TO_CHANNEL",
  message: MessageType
}

type SendMessage = {
  type: "chop/chat/SEND_MESSAGE",
  message: MessageType
}

type ChatActions = 
  | UpdateInputAction
  | AddMessageToChannelAction
  | SendMessage;

type MessageType = {
  id: string,
  user: string,
  message: string
}

type MessagesType = [ MessageType ];

type ChatState = {
  currentInput: string,
  currentChannel: string,
  channels: {
    [string]: MessagesType
  }
}

// Action Creators
const createUid = () => {
  let seed = new Date().getTime(); // Used to insure more randomness
  const regEx = /[xy]/g;
  const replacer = (char) => {
    const randomNumber = (seed + Math.random() * 16)
    seed = Math.floor(seed / 16); // Update Seed
    return (char === 'x' ? randomNumber : (randomNumber & 0x3 | 0x8)).toString(16);
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(regEx, replacer)

}

const createMessage = (message: string, user: string): MessageType => (
  {
    id: createUid(),
    user,
    message
  }
)

const updateInput = (value: string): UpdateInputAction => (
  {
    type: UPDATE_INPUT,
    value
  }
)

const addMessageToChannel = (message: MessageType): AddMessageToChannelAction => (
  {
    type: ADD_MESSAGE_TO_CHANNEL,
    message
  }
)

const validateResponse = (response) => response

const sendMessageFailed = (error) => error

const sendMessageSuccess = (data) => data

const messageValidationFailed = (error) => error

const sendMessage = (text: string) => {
  return function (dispatch, getState) {
    const { user } = getState();
    const message = createMessage(text, user);
    dispatch(addMessageToChannel(message));
    io.sendMessage(message)
    .then(
      response => validateResponse(response),
      error => dispatch(sendMessageFailed(error))
    )
    .then(
      data => dispatch(sendMessageSuccess(data)),
      error => dispatch(messageValidationFailed(error))
    )
  }
}

// Default State
const defaultState = {
  currentInput: "",
  currentChannel: "",
  channels: {}
}

// Reducer
const reducer = (state: ChatState = defaultState, action?: ChatActions): ChatState => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case UPDATE_INPUT:
    return {
            ...state,
            currentInput: action.value.substring(0, 100)
            };
  case ADD_MESSAGE_TO_CHANNEL:
    return state;
  default:
    return state;
  }
};

// Selectors
const atMention = /@\w*/g;

const charaterCount = (chatState: ChatState): number =>
  chatState.currentInput.length;

const inputValue = (chatState: ChatState): string => {
  const wrappInBold = (match) =>
    `<b>${match}</b>`;

    return chatState.currentInput.replace(atMention, wrappInBold);
}

// Exports
export { 
  UPDATE_INPUT,
  ADD_MESSAGE_TO_CHANNEL
};
export type { 
  UpdateInputAction, 
  AddMessageToChannelAction, 
  ChatActions, 
  MessageType, 
  MessagesType, 
  ChatState 
};
export { 
  updateInput, 
  addMessageToChannel 
};
export default reducer;
export {
  charaterCount, 
  inputValue 
};