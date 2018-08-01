// @flow
import { connect } from 'react-redux';

import {
  leaveChat,
  getOtherUser,
  togglePopUpModal,
} from '../feed/dux';

import { publishLeftChatNotification } from '../moment';

import PopUpModal from './popUpModal';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    isPopUpModalVisible: feedState.isPopUpModalVisible,
    otherUser: getOtherUser(feedState),
    currentUser: feedState.currentUser,
  };
};

const mapDispatchToProps = dispatch => (
  {
    togglePopUpModal: isPopUpModalVisible => (dispatch(
      togglePopUpModal(isPopUpModalVisible)
    )),
    leaveChat: user => (dispatch(leaveChat(user))),
    publishLeftChatNotification: name => (dispatch(
      publishLeftChatNotification(name)
    )),
  }
);

const VisiblePopUpModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUpModal);

export default VisiblePopUpModal;
