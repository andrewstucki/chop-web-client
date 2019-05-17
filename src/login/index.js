// @flow
import { connect } from 'react-redux';
import Login from './login';
import { basicAuthLogin } from './dux';
import { clearErrors } from '../errors/dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    isAuthenticated: feedState.isAuthenticated,
  };
};

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