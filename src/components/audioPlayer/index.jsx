// @flow
import React from 'react';
import FilePlayer from 'react-player/lib/players/FilePlayer';

type AudioPlayerProps = {
  url: string | Array<string>,
};

const AudioPlayerConfig = {
  file: {
    forceAudio: true,
  },
};

const AudioPlayer = ({ url }:AudioPlayerProps) => (
  <FilePlayer
    playing
    url={url}
    config={AudioPlayerConfig}
    width={0}
    height={0}
  />
);

export default AudioPlayer;
