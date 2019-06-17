// @flow
import { connect } from 'react-redux';
import GuestNickname from './guestNickname';
import { setPopUpModal } from '../dux';
import { loginType } from '../login/dux';
import { updateSubscriber, updateNickname } from '../../subscriber/dux';

const mapStateToProps = state => ({
  id: state.subscriber.currentSubscriber.id,
});

const mapDispatchToProps = dispatch => (
  {
    login: () => dispatch(setPopUpModal(loginType())),
    updateAndPost: (id, nickname) => dispatch(updateSubscriber(id, updateNickname(nickname))),
  }
);

const VisibleGuestNickname = connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestNickname);

export default VisibleGuestNickname;