// @flow

import { charaterCount } from '../../../src/chat/selectors';
import type { ChatState } from '../../../src/chat/reducer';

test('Test Chat charaterCount', () => {
  const state: ChatState = {
    currentInput: 'Kenny is great!',
    currentChannel: '',
    channels: {}
  }
  expect(charaterCount(state)).toEqual(15);
});