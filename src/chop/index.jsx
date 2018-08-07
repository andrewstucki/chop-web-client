import { connect } from 'react-redux';
import ChopContainer from './chop';

const mapStateToProps = state => ({
  state: state,
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChopContainer);
