// @flow
import reducer, { CHAT_INPUT }  from '../../../src/chat/ducks';

test('Chat charaterCount', () => {
  const result = reducer(
    {
      currentInput: '',
    },
    {
      type: CHAT_INPUT,
      value: 'L',
    });

  expect(result).toEqual(
    {
      currentInput: 'L',
    });
});
