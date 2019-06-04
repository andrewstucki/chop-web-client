//@flow
import { connect } from 'react-redux';
import Event from './event';
import { isOffline, isChatEnabled } from '../../../event/dux';
import { getPublicChannel } from '../../../selectors/channelSelectors';

const mapStateToProps = state => {
  const channel = getPublicChannel(state.feed);
  return {
    isOffline: isOffline(state),
    isChatEnabled: isChatEnabled(state),
    channel,
  };
};

const VisibleEvent = connect(
  mapStateToProps,
)(Event);

export default VisibleEvent;
