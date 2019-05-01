// @flow
import { connect } from 'react-redux';
import Offline from './offline';
import { getNextEventData } from '../../../schedule/dux';
import dayjs from 'dayjs';

const mapStateToProps = state => {
  const nextEvent = getNextEventData(state);
  if (nextEvent) {
    const { title, scheduleTime } = nextEvent;

    const unixTime = dayjs.unix(scheduleTime);
    const localTime = unixTime.format('h:mma dddd, MMM. D');

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
