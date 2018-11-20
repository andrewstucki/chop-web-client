import { connect } from 'react-redux';
import ChopContainer from './chop';

const mapStateToProps = state => ({
  state: state,
  focused: state.feed.isChatFocused,
  authenticated: state.feed.isAuthenticated,
  organization: state.feed.organization.name,
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChopContainer);
