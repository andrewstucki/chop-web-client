import { connect } from 'react-redux';
import ChopContainer from './chop';
import {toggleHideVideo} from '../videoFeed/dux';

const mapStateToProps = state => ({
  authenticated: state.feed.isAuthenticated,
  organization: state.feed.organization.name,
  isVideoHidden: state.feed.isVideoHidden,
});

const mapDispatchToProps = dispatch => ({
  toggleHideVideo: hidden => dispatch(toggleHideVideo(hidden)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChopContainer);
