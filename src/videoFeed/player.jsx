// @flow
import React from 'react';
import {
  JW_PLAYER,
  YOU_TUBE,
  VIMEO,
  WISTIA,
  PlayerTypes,
} from '../selectors/videoSelectors';
import VimeoPlayer from '@vimeo/player';

type PlayerPropsType = {
  url: string,
  startAt: number,
  playerType: PlayerTypes,
};

class Player extends React.Component<PlayerPropsType, void> {
  videoNode: HTMLVideoElement | null;
  player: any;

  componentDidMount () {
    const { startAt, playerType } = this.props;
    switch (playerType) {
    case VIMEO: {
      const player = new VimeoPlayer('vimeo_player');
      player.setCurrentTime(startAt).then(() => {
        player.play();
      });
      break;
    }
    case WISTIA:
      break;
    }
  }

  render () {
    const { url, startAt, playerType } = this.props;

    switch (playerType) {
    case YOU_TUBE: {
      const src = `${url}?autoplay=1&controls=0&disablekb=1&modestbranding=1&start=${startAt}`;

      return (
        <iframe
          type='text/html'
          width='100%'
          height='100%'
          src={src}
          frameBorder='0'
        ></iframe>
      );
    }
    case VIMEO: {
      const src = `${url}?badge=0&byline=0&portrait=0&title=0`;

      return (
        <iframe
          src={src}
          id='vimeo_player'
          width='100%'
          height='100%'
          frameBorder='0'
        ></iframe>
      );
    }
    case WISTIA: {
      return (
        <div
          id='wistia_player'
        ></div>
      );
    }
    case JW_PLAYER: {
      return (
        <div></div>
      );
    }
    }
  }
}

export default Player;

/*
<iframe src="https://player.vimeo.com/video/304478566" width="640" height="338" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/304478566">Sore Eyes for Infinity</a> from <a href="https://vimeo.com/ellivuorinen">Elli Vuorinen</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
*/