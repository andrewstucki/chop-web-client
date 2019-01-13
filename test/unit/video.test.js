// @flow
import reducer, {
  defaultState,
} from '../../src/feed/dux';

import { toggleHideVideo } from '../../src/videoFeed/dux';

describe('Video tests', () => {
  test('video hides', () => {
    const result = reducer(defaultState,
      toggleHideVideo(true));

    expect(result).toEqual(
      {
        ...defaultState,
        isVideoHidden: true,
      }
    );
  });

  test('video shows', () => {
    const result = reducer(
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
