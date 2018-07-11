// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedContents,
  appendMessage,
} from './dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    moments: feedContents(feedState),
    currentChannel: feedState.currentChannel,
    appendingMessage: appendMessage(feedState),
    renderingAnchorMoment: feedState.renderingAnchorMoment,
    placeholderPresent: feedState.placeholderPresent,
  };
};

const VisibleFeed = connect(
  mapStateToProps
)(Feed);

export default VisibleFeed;
