// @flow
import React from 'react';
import videojs from 'video.js';
import 'videojs-youtube/dist/Youtube.min.js';
import styles from './styles.css';

type VideoFeedProps = {
  isVideoHidden: boolean,
  url: string,
};



class VideoFeed extends React.Component {

  componentDidMount() {
    if (this.props.url !== "") {
      this.player = videojs(this.videoNode, this.props, function onPlayerRead() {
        console.log('onPlayerReady', this);
      });
    }
  }

  componentDidUpdate() {
    if (this.props.url !== "") {
      this.player = videojs(this.videoNode, this.props, function onPlayerRead() {
        console.log('onPlayerReady', this);
      });
    }
  }

  componentWillUnmount () {
    if (this.palyer) {
      this.player.dispose();
    }
  }

  render () {
    const setup = {
      "techOrder": ["youtube"],
      "sources": [
        {
          "type": "video/youtube",
          "src": this.props.url,
        },
      ],
    };

    const style = this.props.isVideoHidden ?
          styles.hideVideo :
          styles.showVideo;

    return (
      <div className={style}>
        { this.props.url !== "" &&
        <video
          ref={ node => this.videoNode = node }
          className="video-js"
          data-setup={JSON.stringify(setup)}
            ></video>
        }
      </div>
    );
  }
}

export default VideoFeed;
