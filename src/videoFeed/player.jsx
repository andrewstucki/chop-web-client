// @flow
import React from 'react';
import videojs from 'video.js';
import '../../lib/Vimeo.js';
import '../../lib/wistia.js';
import 'videojs-youtube/dist/Youtube.min.js';
// $FlowFixMe
import '!style-loader!css-loader!video.js/dist/video-js.css';

type YouTubePlayerPropsType = {
  url: string,
};

class YouTubePlayer extends React.Component<YouTubePlayerPropsType, void> {
  videoNode: HTMLVideoElement | null;
  player: any;

  componentDidMount () {
    if (this.props.url !== '') {
      this.player = videojs(this.videoNode, this.props);
    }
  }

  componentDidUpdate () {
    if (this.props.url !== '') {
      this.player = videojs(this.videoNode, this.props);
    }
  }

  componentWillUnmount () {
    if (this.player) {
      this.player.dispose();
    }
  }

  render () {
    const { url } = this.props;

    let type = 'video/youtube';
    if (url.indexOf('vimeo') > -1) {
      type = 'video/vimeo';
    } else if (url.indexOf('wistia') > -1) {
      type = 'video/wistia';
    }

    const setup = {
      techOrder: ['youtube', 'Vimeo', 'wistia'],
      autoplay: 'any',
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

export default YouTubePlayer;
