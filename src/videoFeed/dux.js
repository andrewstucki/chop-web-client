// @flow
import { createSelector } from 'reselect';
import ViemoPlayer from './players/vimeoPlayer';
import YouTubePlayer from './players/youtubePlayer';
import IframeEmbedPlayer from './players/iframeEmbedPlayer';

// Action Types

const SET_VIDEO = 'SET_VIDEO';

// Type Definitions

type VideoType = {
  type: string,
  url: string,
};

type SetVideoType = {
  type: 'SET_VIDEO',
  video: VideoType,
};

type PlayerPropsType = {
  url: string,
  startAt: number,
  style: string,
};

// Action Creators

const setVideo = (url: string, type: string): SetVideoType => (
  {
    type: SET_VIDEO,
    video: {
      url,
      type,
    },
  }
);

// Selectors

const getVideo = state => state.video;

const videoPlayerFactory = createSelector(
  getVideo,
  video => {
    if (video.type === 'live' || video.type === 'offline') {
      return IframeEmbedPlayer;
    } else if (video.url.indexOf('jwplayer') > -1) {
      return null;
    } else if (video.url.indexOf('vimeo') > -1) {
      return ViemoPlayer;
    } else if (video.url.indexOf('wistia') > -1) {
      return null;
    } else {
      return YouTubePlayer;
    }
  }
);

const getVideoStartTime = state => state.event.videoStartTime;

const videoStartAtTime = createSelector(
  getVideoStartTime,
  (state, now) => now,
  (startTime, now) => Math.floor(now / 1000) - startTime
);

// Exports

export {
  setVideo,
  videoStartAtTime,
  videoPlayerFactory,
};

export type {
  SetVideoType,
  VideoType,
  PlayerPropsType,
};

export {
  SET_VIDEO,
};
