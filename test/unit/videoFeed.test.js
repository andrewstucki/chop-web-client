// @flow
import reducer, { getChatFocus } from '../../src/videoFeed/dux';

import { toggleChatFocus } from '../../src/chat/dux';

describe('VideoFeed tests', () => {
  test('default state', () => {
    const result = reducer();
    expect(result).toEqual({
      isVideoHidden: false,
    });
  });

  test('chat focus toggled', () => {
    const result = reducer(
      {
        isVideoHidden: false,
      },
      toggleChatFocus(true)
    );
    expect(result).toEqual({
      isVideoHidden: true,
    });
  });

  test('Get chat focus', () => {
    const result = getChatFocus({isVideoHidden: false});
    expect(result).toEqual(false);
  });
});
