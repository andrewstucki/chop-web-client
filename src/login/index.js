// @flow
import { connect } from 'react-redux';
import Login from './login';
import { basicAuthLogin } from './dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    isAuthenticated: feedState.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => (
  {
    basicAuthLogin: (email, password) => dispatch(basicAuthLogin(email, password)),
  }
);

const VisibleLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default VisibleLogin;