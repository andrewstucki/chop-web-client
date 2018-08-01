// @flow
import { connect } from 'react-redux';

import {
  keepChatting,
  leaveChat,
  getOtherUser,
} from '../feed/dux';
import PopUpModal from './popUpModal';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    showPopUpModal: feedState.showPopUpModal,
    user: getOtherUser(feedState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    keepChatting: () => (dispatch(keepChatting())),
    leaveChat: () => (dispatch(leaveChat())),
  }
);

const VisiblePopUpModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUpModal);

export default VisiblePopUpModal;
