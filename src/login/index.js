// @flow
import { connect } from 'react-redux';
import Login from './login';
import { basicAuthLogin } from './dux';
import { clearErrors } from '../errors/dux';

const mapStateToProps = state => ({
  isAuthenticated: state.feed.isAuthenticated,
});

const mapDispatchToProps = dispatch => (
  {
    basicAuthLogin: (email, password) => dispatch(basicAuthLogin(email, password)),
    clearErrors: () => dispatch(clearErrors()),
  }
);

const VisibleLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default VisibleLogin;