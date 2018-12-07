// @flow
/* global YT */
import React from 'react';
import type { PlayerPropsType } from '../dux';
import '../../../lib/iframe_api';

class YouTubePlayer extends React.Component<PlayerPropsType> {
  componentDidMount () {
    const { startAt } = this.props;
    const onPlayerReady = event => {
      const player = event.target;
      player.seekTo(startAt);
      player.mute();
      player.playVideo();
    };

    // $FlowFixMe
    new YT.Player('youtube_player', {
      events: {
        onReady: onPlayerReady,
      },
    });
  }

  render () {
    const { url, style } = this.props;
    const src = `${url}?enablejsapi=1&controls=0&disablekb=1&modestbranding=1`;

    return (
      <div className={style}>
        <iframe
          id='youtube_player'
          type='text/html'
          width='100%'
          height='100%'
          src={src}
          frameBorder='0'
        ></iframe>
      </div>
    );
  }
}

export default YouTubePlayer;
