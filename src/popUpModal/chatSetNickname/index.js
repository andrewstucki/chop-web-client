// @flow
import { connect } from 'react-redux';
import ChatSetNickname from './chatSetNickname';
import { setPopUpModal } from '../dux';
import { loginType } from '../login/dux';
import { updateGuestNickname } from '../../subscriber/dux';

const mapStateToProps = state => ({
  id: state.subscriber.currentSubscriber.id,
});

const mapDispatchToProps = dispatch => (
  {
    openLogin: () => dispatch(setPopUpModal(loginType())),
    updateAndPost: (id, nickname, action) => dispatch(updateGuestNickname(id, nickname, action)),
  }
);

const VisibleChatSetNickname = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatSetNickname);

export default VisibleChatSetNickname;
