import { createSelector } from 'reselect';

const JW_PLAYER = 'JW_PLAYER';
const IFRAME_PLAYER = 'IFRAME_PLAYER';
const YOU_TUBE = 'YOU_TUBE';
const WISTIA = 'WISTIA';
const VIMEO = 'VIMEO';

const getVideo = state => state.video;

const videoType = createSelector(
  getVideo,
  video => {
    if (video.type === 'live') {
      return IFRAME_PLAYER;
    } else if (video.url.indexOf('jwplayer') > -1) {
      return JW_PLAYER;
    } else if (video.url.indexOf('vimeo') > -1) {
      return VIMEO;
    } else if (video.url.indexOf('wistia') > -1) {
      return WISTIA;
    } else {
      return YOU_TUBE;
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
  VIMEO,
  WISTIA,
  YOU_TUBE,
  videoType,
  videoStartAtTime,
};
