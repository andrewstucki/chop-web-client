// @flow
import React from 'react';
import type { OfflinePlayerPropsType } from '../dux';
import IframeEmbedPlayer from './iframeEmbedPlayer';

const OfflinePlayer = ({ Player, url }: OfflinePlayerPropsType) => {
  if (Player !== null) {
    return (
      <Player
        data-testid='offlinePlayer'
        url={url}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
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
      <IframeEmbedPlayer url={url} />
    );
  }
};

export default React.memo < OfflinePlayerPropsType > (OfflinePlayer);
