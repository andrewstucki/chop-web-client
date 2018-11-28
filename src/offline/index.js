// @flow
import { connect } from 'react-redux';
import Offline from './offline';
import { getNextEventData } from '../selectors/offlineSelectors';
import moment from 'moment';

const mapStateToProps = state => {
  const nextEvent = getNextEventData(state);
  const { title, scheduleTime } = nextEvent;

  const unixTime = moment.unix(scheduleTime);
  const localTime = unixTime.local().format('h:mma dddd, MMM. D');

  return {
    isOffline: false,
    eventName: title,
    eventTime: localTime,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
});

const VisibleOffline = connect(
  mapStateToProps,
  mapDispatchToProps
)(Offline);

export default VisibleOffline;
