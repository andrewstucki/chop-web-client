/* @flow*/
import React from 'react';
import type { OfflinePlayerPropsType } from '../dux';
import IframeEmbedPlayer from './iframeEmbedPlayer';

const OfflinePlayer = ({ Player, url, style }: OfflinePlayerPropsType) => {
  if (Player !== null) {
    return (
      <Player
        url={url}
        className={style}
        width='100%'
        height='100%'
        frameBorder='0'
        controls
        playsinline
        config={{
          youtube: {
            playerVars: {
              disablekb: 1,
              modestbranding: 1,
            },
          },
          vimeo: {
            iframeParams: {
              portrait: false,
              title: false,
            },
          },
        }}
      />
    );
  } else {
    return (
      <IframeEmbedPlayer url={url} style={style}/>
    );
  }
};

export default OfflinePlayer;
