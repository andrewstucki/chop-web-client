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
    openMessageTray: id => dispatch(openMessageTray(id)),
    closeMessageTray: id => dispatch(closeMessageTray(id)),
  }
);

const VisibleMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default VisibleMessage;
