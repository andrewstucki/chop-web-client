import { connect } from 'react-redux';
import Medium from './medium';
import {toggleHideVideo} from '../../../videoFeed/dux';

const mapStateToProps = state => ({
  isVideoHidden: state.feed.isVideoHidden,
});

const mapDispatchToProps = dispatch => ({
  toggleHideVideo: hidden => dispatch(toggleHideVideo(hidden)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Medium);
