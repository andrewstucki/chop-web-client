// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedContents,
  appendMessage,
  getParticipantsBool,
} from './dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    moments: feedContents(feedState),
    currentChannel: feedState.currentChannel,
    appendingMessage: appendMessage(feedState),
    animatingMoment: feedState.renderingAnchorMoment,
    placeholderPresent: feedState.placeholderPresent,
    hasParticipants: getParticipantsBool(feedState),
  };
};

const VisibleFeed = connect(
  mapStateToProps
)(Feed);

export default VisibleFeed;
