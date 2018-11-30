import { createSelector } from 'reselect';

const JW_PLAYER = 'JW_PLAYER';
const IFRAME_PLAYER = 'IFRAME_PLAYER';
const VIDEO_JS_PLAYER = 'VIDEO_JS_PLAYER';

const getVideo = state => state.video;

const videoType = createSelector(
  getVideo,
  video => {
    if (video.type === 'live') {
      return IFRAME_PLAYER;
    } else if (video.url.indexOf('jwplayer') > -1) {
      return JW_PLAYER;
    } else {
      return VIDEO_JS_PLAYER;
    }
  }
);

const getVideoStartTime = state => state.event.videoStartTime;

const videoStartAtTime = createSelector(
  getVideoStartTime,
  (state, now) => now,
  (startTime, now) => Math.floor(now / 1000) - startTime
);

export {
  JW_PLAYER,
  IFRAME_PLAYER,
  VIDEO_JS_PLAYER,
  videoType,
  videoStartAtTime,
};
