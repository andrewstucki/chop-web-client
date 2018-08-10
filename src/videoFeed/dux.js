// @flow

// Type Definitions

const SET_VIDEO_URL = 'SET_VIDEO_URL';

type SetVideoUrlType = {
  type: 'SET_VIDEO_URL',
  url: string,
};

// Action Creators

const setVideoUrl = (url: string): SetVideoUrlType => (
  {
    type: SET_VIDEO_URL,
    url,
  }
);

// Exports

export {
  setVideoUrl,
};

export {
  SET_VIDEO_URL,
};
