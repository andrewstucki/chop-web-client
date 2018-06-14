// @flow
import { connect } from 'react-redux';
import Message from './message';
import {
  openMessageTray,
  closeMessageTray,
  deleteMessage,
} from './dux';

const mapStateToProps = () => (
  {}
);

const mapDispatchToProps = dispatch => (
  {
    openButtonOnClick: id => dispatch(openMessageTray(id)),
    closeButtonOnClick: id => dispatch(closeMessageTray(id)),
    deleteButtonOnClick: id => dispatch(deleteMessage(id)),
  }
);

const VisibleMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default VisibleMessage;
