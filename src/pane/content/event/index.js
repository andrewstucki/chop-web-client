//@flow
import { connect } from 'react-redux';
import Event from './event';
import { isOffline, isChatEnabled } from '../../../selectors/eventSelectors';
import { getPublicChannel } from '../../../selectors/channelSelectors';

const mapStateToProps = state => {
  const channel = getPublicChannel(state);
  return {
    isChatEnabled: isChatEnabled(state),
    isOffline: isOffline(state),
    channel,
  };
};

const VisibleEvent = connect(
  mapStateToProps,
)(Event);

export default VisibleEvent;
