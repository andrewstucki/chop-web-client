// @flow
import React from 'react';
import Player from '@vimeo/player';
import type { PlayerPropsType } from '../dux';

class VimeoPlayer extends React.Component<PlayerPropsType> {
  componentDidMount () {
    const { startAt } = this.props;
    const player = new Player('vimeo_player');

    player.setCurrentTime(startAt).then(() => {
      player.play();
    });
  }

  render () {
    const { url, style } = this.props;
    const src = `${ url.replace('vimeo.com', 'player.vimeo.com/video') }?badge=0&byline=0&portrait=0&title=0&autoplay=1&muted=1`;

    return (
      <div className={style}>
        <iframe
          src={src}
          id='vimeo_player'
          width='100%'
          height='100%'
          frameBorder='0'
        ></iframe>
      </div>
    );
  }
}

export default VimeoPlayer;
