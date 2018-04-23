// @flow
import reducer from '../../../src/chat/reducer';
import { UPDATE_INPUT } from '../../../src/chat/action-types';

test('Chat charaterCount', () => {
  expect(reducer(
    {
      currentInput: "",
      currentChannel: "",
      channels: {}
    },
    {
      type: UPDATE_INPUT,
      value: '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'
    })).toEqual(
  {
    currentInput: '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789',
    currentChannel: "",
    channels: {}
  });
});
