// @flow
import { connect } from 'react-redux';
import Message from './message';
import {
  openMessageTray,
} from './dux';

const mapStateToProps = () => (
  {}
);

const mapDispatchToProps = dispatch => (
  {
    trayButtonOnClick: id => dispatch(openMessageTray(id)),
  }
);

const VisibleMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default VisibleMessage;
