//@flow
import { connect } from 'react-redux';
import HostInfo from './hostInfo';
import { isOffline } from '../selectors/eventSelectors';
import { getNextEventData } from '../schedule/dux';

const mapStateToProps = state => {
  const { feed:feedState } = state;
  const { hostInfo } = isOffline(feedState) ? getNextEventData(state) || {} : feedState.event;

  return {
    hostInfo,
  };
};

const VisibleHostInfo = connect(
  mapStateToProps
)(HostInfo);

export default VisibleHostInfo;
