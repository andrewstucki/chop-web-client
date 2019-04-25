import { connect } from 'react-redux';
import Xlarge from './xlarge';
import { getHostChannel } from '../../../selectors/channelSelectors';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const hostChannel = getHostChannel(feedState);
  return {
    hasVideo: ownProps.hasVideo,
    hostChannel,
  };
};

export default connect(
  mapStateToProps
)(Xlarge);