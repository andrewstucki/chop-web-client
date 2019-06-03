// @flow
import { connect } from 'react-redux';
import { updateSubscriber, updateTextMode } from '../subscriber/dux';
import TextModeToggle from './textModeToggle';

const mapStateToProps = state => ({
  mode: state.subscriber.currentSubscriber.preferences.textMode,
  subscriberId: state.subscriber.currentSubscriber.id,
});

const mapDispatchToProps = dispatch => (
  {
    toggleTextMode: (subscriberId, mode) => (dispatch(updateSubscriber(subscriberId, updateTextMode(mode)))),
  }
);

const VisibleTextModeToggle = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextModeToggle);

export default VisibleTextModeToggle;
