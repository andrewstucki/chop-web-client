// @flow
import reducer, { UPDATE_INPUT }  from '../../../src/chat/ducks';

test('Chat charaterCount', () => {
  expect(reducer(
    {
      currentInput: '',
      currentChannel: '',
      channels: {},
      user: 'kenny',
    },
    {
      type: UPDATE_INPUT,
      value: '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789',
    })).toEqual(
    {
      currentInput: '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789',
      currentChannel: '',
      channels: {},
      user: 'kenny',
    });
});
