import { connect } from 'react-redux';
import ChopContainer from './chop';
import { isEmpty } from '../util';

const mapStateToProps = state => ({
  authenticated: state.feed.isAuthenticated,
  organization: state.feed.organization.name,
  hasVideo: !isEmpty(state.feed.video.url),
});

export default connect(
  mapStateToProps,
)(ChopContainer);
