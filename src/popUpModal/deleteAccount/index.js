// @flow
import DeleteAccount from './deleteAccount';
import { connect } from 'react-redux';
import { deleteSelf } from '../../subscriber/dux';
import type { ChopStateType } from '../../chop/dux';
import { setPopUpModal, togglePopUpModal } from '../dux';
import { profileSettingsType } from '../profileSettings/dux';

const mapStateToProps = (state:ChopStateType, ownProps) => ({
  isSmall: ownProps.isSmall,
});

const mapDispatchToProps = dispatch => (
  {
    deleteAccount: () => {
      dispatch(deleteSelf());
      dispatch(togglePopUpModal());
    },
    togglePopUpModal: () => dispatch(setPopUpModal(profileSettingsType())),
  }
);

const VisibleDeleteAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAccount);

export default VisibleDeleteAccount;
