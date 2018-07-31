// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedContents,
  appendMessage,
  hasParticipants,
} from './dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    moments: feedContents(feedState),
    currentChannel: feedState.currentChannel,
    appendingMessage: appendMessage(feedState),
    animatingMoment: feedState.renderingAnchorMoment,
    placeholderPresent: feedState.placeholderPresent,
    hasParticipants: hasParticipants(feedState),
  };
};

const VisibleFeed = connect(
  mapStateToProps
)(Feed);

export default VisibleFeed;
