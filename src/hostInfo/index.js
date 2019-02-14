//@flow
import { connect } from 'react-redux';
import HostInfo from './hostInfo';
import { isOffline } from '../selectors/eventSelectors';

const mapStateToProps = state => {
  const { feed:feedState } = state;
  const { hostInfo } = isOffline(feedState) ? feedState.schedule[0] || {} : feedState.event;

  return {
    hostInfo,
  };
};

const VisibleHostInfo = connect(
  mapStateToProps
)(HostInfo);

export default VisibleHostInfo;
