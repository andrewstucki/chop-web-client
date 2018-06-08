// @flow
import { connect } from 'react-redux';
import Message from './message';
import {
  openMessageTray,
  getTrayStatus,
} from './dux';

const mapStateToProps = state => {
  const messageState = state.message;
  return {
    messageTrayOpen: getTrayStatus(messageState),
  };
};

const mapDispatchToProps = dispatch => ({
  trayButtonOnClick: () => dispatch(openMessageTray()),
});

const VisibleMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default VisibleMessage;
