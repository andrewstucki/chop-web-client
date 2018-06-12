// @flow
import { connect } from 'react-redux';
import Message from './message';
import {
  openMessageTray,
  closeMessageTray,
} from './dux';

const mapStateToProps = () => (
  {}
);

const mapDispatchToProps = dispatch => (
  {
    messageButtonOnClick: id => dispatch(openMessageTray(id)),
    trayButtonOnClick: id => dispatch(closeMessageTray(id)),
  }
);

const VisibleMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default VisibleMessage;
