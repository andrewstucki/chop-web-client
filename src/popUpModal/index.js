// @flow
import { connect } from 'react-redux';

import {
  togglePopUpModal,
} from './dux';

import PopUpModal from './popUpModal';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { isSmall = false } = ownProps;
  return {
    isPopUpModalVisible: feedState.isPopUpModalVisible,
    modal: feedState.popUpModal,
    isSmall,
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
