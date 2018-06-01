// @flow
import reducer,
{ 
  getChatFocus,
  defaultState,
  setVideoUrl,
} from '../../src/videoFeed/dux';

import { toggleChatFocus } from '../../src/chat/dux';

describe('VideoFeed tests', () => {
  test('default state', () => {
    const result = reducer();
    expect(result).toEqual({
      isVideoHidden: false,
      url: '',
    });
  });

  test('chat focus toggled', () => {
    const result = reducer(
      defaultState,
      toggleChatFocus(true)
    );
    expect(result).toEqual({
      ...defaultState,
      isVideoHidden: true,
    });
  });

  test('Get chat focus', () => {
    const result = getChatFocus(defaultState);
    expect(result).toEqual(false);
  });

  test('set url', () => {
    const result = reducer(
      defaultState,
      setVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    );
    expect(result).toEqual(
      {
        isVideoHidden: false,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      }
    );
  });
});
