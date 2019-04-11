// @flow
import { connect } from 'react-redux';

import {
  togglePopUpModal,
  leaveChannel,
  removeChannel,
} from '../feed/dux';
import { publishLeftChannelNotification } from '../moment/notification/dux';
import { getChannelById, getCurrentChannel } from '../selectors/channelSelectors';

import {
  getOtherUsers,
  hasOtherUsers,
} from '../selectors/chatSelectors';

import PopUpModal from './popUpModal';

const mapStateToProps = state => {
  const feedState = state.feed;
  const currentChannel = getCurrentChannel(feedState);
  const channel = getChannelById(feedState, currentChannel);

  return {
    isPopUpModalVisible: feedState.isPopUpModalVisible,
    otherUser: getOtherUsers(feedState, currentChannel)[0],
    hasOtherUsers: hasOtherUsers(feedState, currentChannel),
    currentUser: feedState.currentUser,
    currentChannel,
    isPlaceholder: channel?.placeholder || false,
  };
};

const mapDispatchToProps = dispatch => (
  {
    togglePopUpModal: () => (dispatch(togglePopUpModal())),
    leaveChannel: (channelId, isPlaceholder) => isPlaceholder ? dispatch(removeChannel(channelId)) : dispatch(leaveChannel(channelId)),
    publishLeftChannelNotification: (name, pubnubToken, channel, date) => (dispatch(publishLeftChannelNotification(name, pubnubToken, channel, date))),
  }
);

const VisiblePopUpModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUpModal);

export default VisiblePopUpModal;
