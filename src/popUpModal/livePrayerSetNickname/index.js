// @flow
import { connect } from 'react-redux';
import LivePrayerSetNickname from './livePrayerSetNickname';
import { setPopUpModal } from '../dux';
import { loginType } from '../login/dux';
import { updateGuestNickname } from '../../subscriber/dux';

const mapStateToProps = state => ({
  id: state.subscriber.currentSubscriber.id,
});

const mapDispatchToProps = dispatch => (
  {
    login: () => dispatch(setPopUpModal(loginType())),
    updateAndRequestPrayer: (id, nickname, action) => dispatch(updateGuestNickname(id, nickname, action)),
  }
);

const VisibleLivePrayerSetNickname = connect(
  mapStateToProps,
  mapDispatchToProps
)(LivePrayerSetNickname);

export default VisibleLivePrayerSetNickname;
