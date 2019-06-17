import { connect } from 'react-redux';
import ChopContainer from './chop';
import { isEmpty } from '../util';
import { setPopUpModal } from '../popUpModal/dux';
import { resetPassword } from '../popUpModal/resetPassword/dux';

const mapStateToProps = state => ({
  organization: state.feed.organization.name,
  hasVideo: !isEmpty(state.feed.video.url),
});

const mapDispatchToProps = dispatch => (
  {
    resetPassword: resetToken => dispatch(setPopUpModal(resetPassword(resetToken))),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChopContainer);
