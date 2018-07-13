// @flow
import { connect } from 'react-redux';

import { releaseAnchorMoment } from './anchorMoment/dux';
import {
  placeholderContents,
  getCurrentChannel,
  setAnchorMomentAnchored,
} from './dux';

import Placeholder from './placeholder';

const mapStateToProps = state => {
  const placeholderState = state.placeholder;
  const feedState = state.feed;
  return {
    anchorMoment: placeholderContents(placeholderState),
    renderPlaceholder: placeholderState.renderPlaceholder,
    currentChannel: getCurrentChannel(feedState),
    anchorMomentAnchored: setAnchorMomentAnchored(placeholderState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    releaseAnchorMoment: () => dispatch(releaseAnchorMoment()),
  }
);

const VisiblePlaceholder = connect(
  mapStateToProps,
  mapDispatchToProps
)(Placeholder);

export default VisiblePlaceholder;
