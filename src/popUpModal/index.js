// @flow
import { connect } from 'react-redux';

import {
  togglePopUpModal,
} from './dux';

import PopUpModal from './popUpModal';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    isPopUpModalVisible: feedState.isPopUpModalVisible,
    modal: feedState.popUpModal,
  };
};

const mapDispatchToProps = dispatch => (
  {
    togglePopUpModal: () => (dispatch(togglePopUpModal())),
  }
);

const VisiblePopUpModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUpModal);

export default VisiblePopUpModal;
