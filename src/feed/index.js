// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedContents,
  hasParticipants,
  togglePopUpModal,
  feedAnchorMoments,
} from './dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    moments: feedContents(feedState),
    anchorMoments: feedAnchorMoments(feedState),
    currentChannel: feedState.currentChannel,
    animatingMoment: feedState.renderingAnchorMoment,
    hasParticipants: hasParticipants(feedState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    togglePopUpModal: () => (dispatch(togglePopUpModal())),
  }
);

const VisibleFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default VisibleFeed;
