// @flow
import React from 'react';
import videojs from 'video.js';
import '../../lib/Vimeo.js';
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
    const type = url.indexOf('youtube') > -1 ? 'video/youtube' : 'video/vimeo';
    const setup = {
      techOrder: ['youtube', 'Vimeo'],
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
