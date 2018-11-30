// @flow
import { connect } from 'react-redux';
import Offline from './offline';
import { getNextEventData } from '../../../selectors/eventSelectors';
import moment from 'moment';

const mapStateToProps = state => {
  const { feed:feedState } = state;
  const nextEvent = getNextEventData(feedState);
  if (nextEvent) {
    const { title, scheduleTime } = nextEvent;

    const unixTime = moment.unix(scheduleTime);
    const localTime = unixTime.local().format('h:mma dddd, MMM. D');

    return {
      eventName: title,
      eventTime: localTime,
    };
  } else {
    return {
      eventName: '',
      eventTime: '',
    };
  }
};

const VisibleOffline = connect(
  mapStateToProps,
)(Offline);

export default VisibleOffline;
