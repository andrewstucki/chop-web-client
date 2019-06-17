// @flow
import { connect } from 'react-redux';
import ResetPassword from './resetPassword';
import { publishResetPassword } from '../../subscriber/dux';

const mapStateToProps = () => null;

const mapDispatchToProps = dispatch => (
  {
    resetPassword: (resetToken, password) => dispatch(publishResetPassword(resetToken, password)),
  }
);

const VisibleResetPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);

export default VisibleResetPassword;