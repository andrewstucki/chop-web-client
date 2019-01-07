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
  const feedState = state.feed;
  const { type } = feedState.video;
  let { url } = feedState.video;

  /* eslint-disable-next-line no-useless-escape */
  const urlYoutube = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
  const urlVimeo = /https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

  if (url.match(urlYoutube)) {
    url = url.replace(urlYoutube, '//www.youtube.com/embed/$1');
  } else if (url.match(urlVimeo)) {
    url = url.replace(urlVimeo, '//player.vimeo.com/video/$2');
  }

  return {
    isVideoHidden: feedState.isVideoHidden,
    type,
    url,
    Player: videoPlayerFactory(feedState),
    startAt: videoStartAtTime(feedState, Date.now()),
    isVideoPlaying: feedState.isVideoPlaying,
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
