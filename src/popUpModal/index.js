// @flow
import { connect } from 'react-redux';

import {
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

const VisiblePopUpModal = connect(
  mapStateToProps
)(PopUpModal);

export default VisiblePopUpModal;
