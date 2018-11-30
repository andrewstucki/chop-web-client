// @flow
import { connect } from 'react-redux';

import { 
  releaseAnchorMoment,
} from './dux';

import AnchorMoment from './anchorMoment';
import { paneContentSelector } from '../selectors/paneSelectors';
import { PRIMARY_PANE } from '../pane/dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  const primaryPane = paneContentSelector(feedState, PRIMARY_PANE);
  
  return {
    currentChannel: primaryPane.channelId,
    salvations: feedState.salvations,
  };
};

const mapDispatchToProps = dispatch => (
  {
    releaseAnchorMoment: (channel, id) => dispatch(
      releaseAnchorMoment(channel, id)
    ),
  }
);

const VisibleAnchorMoment = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnchorMoment);

export default VisibleAnchorMoment;