// @flow
import type { ChatState } from './reducer';

const atMention = /@\w*/g;

const charaterCount = (chatState: ChatState): number =>
  chatState.currentInput.length;

const inputValue = (chatState: ChatState): string => {
  const wrappInBold = (match) =>
    `<b>${match}</b>`;

    return chatState.currentInput.replace(atMention, wrappInBold);
}
  

export { charaterCount, inputValue };