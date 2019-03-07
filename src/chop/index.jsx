import { connect } from 'react-redux';
import ChopContainer from './chop';

const mapStateToProps = state => ({
  authenticated: state.feed.isAuthenticated,
  organization: state.feed.organization.name,
});

export default connect(
  mapStateToProps,
)(ChopContainer);
