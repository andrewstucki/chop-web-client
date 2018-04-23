// @flow
import type { ChatState } from './reducer';

const charaterCount = (chatState: ChatState): number =>
  chatState.currentInput.length;

export { charaterCount };