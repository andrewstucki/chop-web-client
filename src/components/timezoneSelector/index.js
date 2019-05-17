// @flow
import TimezoneSelector from './timezoneSelector';
import { connect } from 'react-redux';
import { setScheduleTimeZone, getScheduleTimeZone } from '../../schedule/dux';

const mapStateToProps = state => ({
  timeZone: getScheduleTimeZone(state),
});

const mapDispatchToProps = dispatch => ({
  setScheduleTimeZone: (timeZone:string) => dispatch(setScheduleTimeZone(timeZone)),
});

const VisibleTimezoneSelector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimezoneSelector);

export default VisibleTimezoneSelector;
