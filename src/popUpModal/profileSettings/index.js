// @flow
import ProfileSettings from './profileSettings';
import { connect } from 'react-redux';
import type { ChopStateType } from '../../chop/dux';
import { updateSubscriber, getCurrentSubscriber, uploadAvatar, type SubscriberInputType } from '../../subscriber/dux';
import { setPopUpModal, togglePopUpModal } from '../dux';
import { removeAvatarType } from '../removeAvatar/dux';
import { deleteAccountType } from '../deleteAccount/dux';

const mapStateToProps = (state:ChopStateType, ownProps) => ({
  togglePopUpModal: ownProps.togglePopUpModal,
  currentSubscriber: getCurrentSubscriber(state),
  isSmall: ownProps.isSmall,
});

const mapDispatchToProps = dispatch => (
  {
    updateSubscriber: (id:string, input:SubscriberInputType) => {
      dispatch(updateSubscriber(id, input));
      dispatch(togglePopUpModal());
    },
    uploadAvatar: (id: string, formData: FormData) => dispatch(uploadAvatar(id, formData)),
    promptRemoveAvatar: () => dispatch(setPopUpModal(removeAvatarType())),
    promptDeleteAccount: () => dispatch(setPopUpModal(deleteAccountType())),
  }
);

const VisibleProfileSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettings);

export default VisibleProfileSettings;
