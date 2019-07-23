// @flow
import { connect } from 'react-redux';
import { togglePopUpModal } from '../../popUpModal/dux';
import { livePrayerSetNicknameType } from '../../popUpModal/livePrayerSetNickname/dux';
import { getCurrentSubscriberAsSharedSubscriber } from '../../subscriber/dux';
import LivePrayerButton from './livePrayerButton';
import { requestLivePrayer } from '../../livePrayer/dux';

const mapStateToProps = state => ({
  currentSubscriber: getCurrentSubscriberAsSharedSubscriber(state),
});

const mapDispatchToProps = dispatch => ({
  setNickname: () => dispatch(togglePopUpModal(livePrayerSetNicknameType())),
  requestLivePrayer: (requesterPubnubToken, requesterNickname) => dispatch(requestLivePrayer(requesterPubnubToken, requesterNickname)),
});

const VisibleLivePrayerButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LivePrayerButton);

export default VisibleLivePrayerButton;