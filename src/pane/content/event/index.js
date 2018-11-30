//@flow
import { connect } from 'react-redux';
import Event from './event';
import { isOffline } from '../../../selectors/eventSelectors';
import { paneContentSelector } from '../../../selectors/paneSelectors';
import { PRIMARY_PANE } from '../../../pane/dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  const primaryPane = paneContentSelector(feedState, PRIMARY_PANE);
  return {
    isOffline: isOffline(feedState),
    channel: primaryPane.channelId,
  };
};

const VisibleEvent = connect(
  mapStateToProps,
)(Event);

export default VisibleEvent;
