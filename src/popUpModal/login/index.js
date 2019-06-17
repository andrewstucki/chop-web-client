// @flow
import { connect } from 'react-redux';
import Login from './login';
import { basicAuthLogin, removeLoginError } from '../../login/dux';
import { setPopUpModal } from '../dux';
import { requestPasswordReset } from '../requestPasswordReset/dux';

const mapStateToProps = state => (
  {
    isAuthenticated: state.feed.isAuthenticated,
    error: state.feed.popUpModal.error,
  }  
);

const mapDispatchToProps = dispatch => (
  {
    basicAuthLogin: (email, password) => dispatch(basicAuthLogin(email, password)),
    removeLoginError: () => dispatch(removeLoginError()),
    resetPassword: () => dispatch(setPopUpModal(requestPasswordReset())),
  }
);

const VisibleLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default VisibleLogin;