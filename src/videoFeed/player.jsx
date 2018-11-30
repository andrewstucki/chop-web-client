// @flow
import React from 'react';
import videojs from 'video.js';
import '../../lib/Vimeo.js';
import '../../lib/wistia.js';
import 'videojs-youtube/dist/Youtube.min.js';
// $FlowFixMe
import '!style-loader!css-loader!video.js/dist/video-js.css';


type PlayerPropsType = {
  url: string,
  startAt: number,
};

class Player extends React.Component<PlayerPropsType, void> {
  videoNode: HTMLVideoElement | null;
  player: any;

  componentDidMount () {
    if (this.props.url !== '') {
      this.player = videojs(this.videoNode, this.props);
    }
  }

  componentDidUpdate () {
    if (this.player) {
      this.player = videojs(this.videoNode);
    }
  }

  componentWillUnmount () {
    if (this.player) {
      this.player.dispose();
    }
  }

  render () {
    const { url, startAt } = this.props;

    let type = 'video/youtube';
    if (url.indexOf('vimeo') > -1) {
      type = 'video/vimeo';
    } else if (url.indexOf('wistia') > -1) {
      type = 'video/wistia';
    }

    const setup = {
      techOrder: ['youtube', 'Vimeo', 'wistia'],
      autoplay: 'any',
      startTime: startAt,
      vimeo: {
        color: '#fbc51b',
      },
      fluid: true,
      sources: [
        {
          type: type,
          src: url,
        },
      ],
    };

    return (
      <video
        ref={ node => this.videoNode = node }
        className='video-js'
        data-setup={JSON.stringify(setup)}
      ></video>
    );
  }
}

export default Player;
