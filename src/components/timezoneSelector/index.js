// @flow
import TimezoneSelector from './timezoneSelector';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setScheduleTimeZone, getScheduleTimeZone } from '../../schedule/dux';

const mapStateToProps = state => ({
  timeZone: getScheduleTimeZone(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ setScheduleTimeZone }, dispatch);

const VisibleTimezoneSelector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimezoneSelector);

export default VisibleTimezoneSelector;
