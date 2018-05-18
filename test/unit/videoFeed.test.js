// @flow
import reducer, { getChatFocus } from '../../src/videoFeed/dux';

import { toggleChatFocus } from '../../src/chat/dux';

describe('VideoFeed tests', () => {
  test('default state', () => {
    const result = reducer();
    expect(result).toEqual({
      chatIsFocused: false,
    });
  });

  test('chat focus toggled', () => {
    const result = reducer(
      {
        chatIsFocused: false,
      },
      toggleChatFocus(true)
    );
    expect(result).toEqual({
      chatIsFocused: true,
    });
  });

  test('Get chat focus', () => {
    const result = getChatFocus({chatIsFocused: false});
    expect(result).toEqual(false);
  });
});
