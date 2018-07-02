// @flow
import { connect } from 'react-redux';
import Message from './message';
import {
  openMessageTray,
  closeMessageTray,
  deleteMessage,
  toggleCloseTrayButton,
} from './dux';

const mapStateToProps = () => (
  {}
);

const mapDispatchToProps = dispatch => (
  {
    openMessageTray: id => dispatch(openMessageTray(id)),
    closeMessageTray: id => dispatch(closeMessageTray(id)),
    deleteMessage: id => dispatch(deleteMessage(id)),
    toggleCloseTrayButton: id => dispatch(toggleCloseTrayButton(id)),
  }
);

const VisibleMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default VisibleMessage;
