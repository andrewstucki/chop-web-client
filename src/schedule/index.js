import { connect } from 'react-redux';
import Schedule from './schedule';
import { getScheduleGroupedByDay } from './dux';

const mapStateToProps = state => ({
  schedule: getScheduleGroupedByDay(state),
});

export default connect(
  mapStateToProps,
)(Schedule);
