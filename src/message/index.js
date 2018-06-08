// @flow
import { connect } from 'react-redux';
import Message from './message';
import {
  openMessageTray,
} from './dux';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  trayButtonOnClick: e => {
    console.log(e.target.getAttribute('data-messageid'))
    return dispatch(openMessageTray(e.target.getAttribute('data-messageid'))
  )},
});

const VisibleMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default VisibleMessage;
