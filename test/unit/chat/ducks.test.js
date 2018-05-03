// @flow
import reducer, { ADD_MESSAGE_TO_CHANNEL }  from '../../../src/chat/ducks';

test('Chat charaterCount', () => {
  const result = reducer(
    {
      currentInput: '',
      currentChannel: 'main',
      channels: {
        main: [],
      },
      user: 'kenny',
    },
    {
      type: ADD_MESSAGE_TO_CHANNEL,
      message: {
        id: '1234',
        user: 'Kenny',
        message: 'Hello World!',
      },
    });

  expect(result).toEqual(
    {
      currentInput: '',
      currentChannel: 'main',
      channels: {
        main: [
          {
            id: '1234',
            user: 'Kenny',
            message: 'Hello World!',
          },
        ],
      },
      user: 'kenny',
    });
});
