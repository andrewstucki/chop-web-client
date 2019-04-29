import { connect } from 'react-redux';
import Medium from './medium';
import {toggleHideVideo} from '../../../videoFeed/dux';

const mapStateToProps = (state, ownProps) => ({
  isVideoHidden: state.feed.isVideoHidden,
  hasVideo: ownProps.hasVideo,
});

const mapDispatchToProps = dispatch => ({
  toggleHideVideo: hidden => dispatch(toggleHideVideo(hidden)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Medium);
