// @flow
import { connect } from 'react-redux';
import { releaseAnchorMoment } from './dux';
import AnchorMoment from './anchorMoment';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { currentChannel } = ownProps;

  return {
    currentChannel,
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
