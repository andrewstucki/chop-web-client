// @flow
import { connect } from 'react-redux';
import RequestPasswordReset from './requestPasswordReset';
import { publishRequestPasswordReset } from '../../subscriber/dux';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => (
  {
    requestPasswordReset: email => dispatch(publishRequestPasswordReset(email)),
  }
);

const VisibleRequestPasswordReset = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestPasswordReset);

export default VisibleRequestPasswordReset;