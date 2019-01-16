// @flow
import reducer, {
  defaultState,
} from '../../src/feed/dux';

import { toggleHideVideo } from '../../src/videoFeed/dux';

describe('Video tests', () => {
  test('video hides', () => {
    const { lastAction, ...result } = reducer(defaultState, // eslint-disable-line no-unused-vars
      toggleHideVideo(true));

    expect(result).toEqual(
      {
        ...defaultState,
        isVideoHidden: true,
      }
    );
  });

  test('video shows', () => {
    const { lastAction, ...result } = reducer( // eslint-disable-line no-unused-vars
      {
        ...defaultState,
        isVideoHidden: true,
      },
      toggleHideVideo(false));

    expect(result).toEqual(
      {
        ...defaultState,
        isVideoHidden: false,
      }
    );
  });
});
