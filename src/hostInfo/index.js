//@flow
import { connect } from 'react-redux';
import HostInfo from './hostInfo';
import { isOffline } from '../selectors/eventSelectors';
import { getNextEventData } from '../schedule/dux';

const mapStateToProps = state => {
  const { hostInfo } = isOffline(state) ? getNextEventData(state) || {} : state.feed.event;

  return {
    hostInfo,
  };
};

const VisibleHostInfo = connect(
  mapStateToProps
)(HostInfo);

export default VisibleHostInfo;
