// @flow
import { connect } from 'react-redux';
import { updateUser, updateTextMode } from '../users/dux';
import TextModeToggle from './textModeToggle';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    mode: feedState.currentUser.preferences.textMode,
    userId: feedState.currentUser.id,
  };
};

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