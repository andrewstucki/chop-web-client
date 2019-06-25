// @flow
import { connect } from 'react-redux';
import GuestNickname from './guestNickname';
import { setPopUpModal } from '../dux';
import { loginType } from '../login/dux';
import { updateGuestNickname } from '../../subscriber/dux';

const mapStateToProps = state => ({
  id: state.subscriber.currentSubscriber.id,
});

const mapDispatchToProps = dispatch => (
  {
    openLogin: () => dispatch(setPopUpModal(loginType())),
    updateAndPost: (id, nickname) => dispatch(updateGuestNickname(id, nickname)),
  }
);

const VisibleGuestNickname = connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestNickname);

export default VisibleGuestNickname;
