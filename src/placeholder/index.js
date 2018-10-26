// @flow
import { connect } from 'react-redux';

import { releaseAnchorMoment } from './anchorMoment/dux';
import {
  placeholderContents,
  getCurrentChannel,
  toggleAnchorMomentAnchored,
} from './dux';

import Placeholder from './placeholder';
import { getHostChannel } from '../selectors/channelSelectors';

const mapStateToProps = state => {
  const feedState = state.feed;
  const hostChannel = getHostChannel(feedState);

  return {
    anchorMoment: placeholderContents(feedState),
    isPlaceholderPresent: feedState.isPlaceholderPresent,
    currentChannel: getCurrentChannel(feedState),
    hostChannel,
    isAnchorMomentAnchored: toggleAnchorMomentAnchored(feedState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    releaseAnchorMoment: channel => dispatch(
      releaseAnchorMoment(channel)
    ),
  }
);

const VisiblePlaceholder = connect(
  mapStateToProps,
  mapDispatchToProps
)(Placeholder);

export default VisiblePlaceholder;
