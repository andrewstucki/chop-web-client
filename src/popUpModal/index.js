// @flow
import { connect } from 'react-redux';

import {
  leaveChat,
  getOtherUser,
  togglePopUpModal,
  removeChannel,
} from '../feed/dux';

import { publishLeftChatNotification } from '../moment';

import PopUpModal from './popUpModal';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    isPopUpModalVisible: feedState.isPopUpModalVisible,
    otherUser: getOtherUser(feedState),
    currentUser: feedState.currentUser,
    currentChannel: feedState.currentChannel,
  };
};

const mapDispatchToProps = dispatch => (
  {
    togglePopUpModal: () => (dispatch(togglePopUpModal())),
    leaveChat: user => (dispatch(leaveChat(user))),
    publishLeftChatNotification: (userName, channelName) => (dispatch(
      publishLeftChatNotification(userName, channelName)
    )),
    removeChannel: channelName => (dispatch(removeChannel(channelName))),
  }
);

const VisiblePopUpModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUpModal);

export default VisiblePopUpModal;
