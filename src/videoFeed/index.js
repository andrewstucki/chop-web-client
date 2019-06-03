// @flow
import { connect } from 'react-redux';
import VideoFeed from './videoFeed';
import {
  videoPlayerFactory,
  videoStartAtTime,
  playVideo,
  pauseVideo,
} from './dux';
import { isMobileDevice } from '../util';

const mapStateToProps = state => {
  const { type } = state.feed.video;
  let { url } = state.feed.video;

  const urlYoutube = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
  const urlVimeo = /https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

  if (url.match(urlYoutube)) {
    url = url.replace(urlYoutube, '//www.youtube.com/embed/$1');
  } else if (url.match(urlVimeo)) {
    url = url.replace(urlVimeo, '//player.vimeo.com/video/$2');
  }

  return {
    isVideoHidden: state.feed.isVideoHidden,
    type,
    url,
    Player: videoPlayerFactory(state),
    startAt: videoStartAtTime(state, Date.now()),
    isVideoPlaying: state.feed.isVideoPlaying,
    isMobileDevice: isMobileDevice(),
  };
};

const mapDispatchToProps = dispatch => (
  {
    onPause: () => dispatch(pauseVideo()),
    onPlay: () => dispatch(playVideo()),
  }
);

const VisibleVideoFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoFeed);

export default VisibleVideoFeed;
