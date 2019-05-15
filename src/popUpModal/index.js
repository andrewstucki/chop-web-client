// @flow
import { connect } from 'react-redux';

import {
  togglePopUpModal,
} from './dux';

import PopUpModal from './popUpModal';

const mapStateToProps = state => ({
  isPopUpModalVisible: state.feed.isPopUpModalVisible,
  modal: state.feed.popUpModal,
});

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
