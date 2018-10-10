// @flow
import { connect } from 'react-redux';

import { releaseAnchorMoment } from './anchorMoment/dux';
import {
  placeholderContents,
  getCurrentChannel,
  toggleAnchorMomentAnchored,
} from './dux';

import Placeholder from './placeholder';
import { getChannelByName } from '../util';

const mapStateToProps = state => {
  const feedState = state.feed;
  const hostChannel = Object.keys(feedState.channels).length ? getChannelByName(feedState.channels, 'Host') : '';

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
