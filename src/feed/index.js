// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedContents,
  appendMessage,
  hasParticipants,
  togglePopUpModal,
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
    isPopUpModalPresent: feedState.isPopUpModalPresent,
  };
};

const mapDispatchToProps = dispatch => (
  {
    togglePopUpModal: isPopUpModalPresent => (dispatch(
      togglePopUpModal(isPopUpModalPresent)
    )),
  }
);

const VisibleFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default VisibleFeed;
