// @flow
import React from 'react';

import { 
  LEAVE_CHAT,
  MUTE_USER,
} from './dux';
import LeaveChatPopUpModal from './leaveChat/';
import MuteUserPopUpModal from './muteUser/';
import type { PopUpModalType } from './dux';
import styles from './style.css';

type PopUpModalPropType = {
  isPopUpModalVisible: boolean,
  modal: PopUpModalType,
  togglePopUpModal: () => void,
};

class PopUpModal extends React.Component<PopUpModalPropType> {
  render () {
    const { modal, isPopUpModalVisible, togglePopUpModal } = this.props;
    if (isPopUpModalVisible) {
      switch (modal.type) {
        case LEAVE_CHAT:
          return (
            <div className={styles.popUpModal}>
              <LeaveChatPopUpModal
                togglePopUpModal={togglePopUpModal}
              />
            </div>
          );
        case MUTE_USER:
          return (
            <div className={styles.popUpModal}>
              <MuteUserPopUpModal
                togglePopUpModal={togglePopUpModal}
                user={modal.user}
              />
            </div>
          );
        default:
          return null;
      }
    } 
    return null;  
  }
}

export default PopUpModal;
