// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedContents,
  hasParticipants,
  feedAnchorMoments,
} from '../selectors/channelSelectors';

import {
  togglePopUpModal,
} from './dux';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { channel } = ownProps;
  return {
    moments: feedContents(feedState, channel),
    anchorMoments: feedAnchorMoments(feedState, channel),
    currentChannel: channel,
    animatingMoment: feedState.renderingAnchorMoment,
    hasParticipants: hasParticipants(feedState, channel),
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
