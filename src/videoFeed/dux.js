// @flow

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

// Exports

export {
  setVideo,
};

export type {
  SetVideoType,
  VideoType,
};

export {
  SET_VIDEO,
};
