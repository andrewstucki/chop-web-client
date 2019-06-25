// @flow
import RemoveAvatar from './removeAvatar';
import { connect } from 'react-redux';
import { updateSubscriber, getCurrentSubscriberAsSharedSubscriber } from '../../subscriber/dux';
import type { ChopStateType } from '../../chop/dux';
import { setPopUpModal } from '../dux';
import { profileSettingsType } from '../profileSettings/dux';

const mapStateToProps = (state:ChopStateType, ownProps) => ({
  currentSubscriberId: getCurrentSubscriberAsSharedSubscriber(state).id,
  isSmall: ownProps.isSmall,
});

const mapDispatchToProps = dispatch => (
  {
    removeAvatar: (id:string) => {
      dispatch(updateSubscriber(id, { avatar: '' }));
      dispatch(setPopUpModal(profileSettingsType()));
    },
    togglePopUpModal: () => dispatch(setPopUpModal(profileSettingsType())),
  }
);

const VisibleRemoveAvatar = connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveAvatar);

export default VisibleRemoveAvatar;
