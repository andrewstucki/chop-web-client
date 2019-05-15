// @flow
import { connect } from 'react-redux';
import { updateUser, updateTextMode } from '../users/dux';
import TextModeToggle from './textModeToggle';

const mapStateToProps = state => ({
  mode: state.user.currentUser.preferences.textMode,
  userId: state.user.currentUser.id,
});

const mapDispatchToProps = dispatch => (
  {
    toggleTextMode: (userId, mode) => (dispatch(updateUser(userId, updateTextMode(mode)))),
  }
);

const VisibleTextModeToggle = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextModeToggle);

export default VisibleTextModeToggle;