// @flow
import { connect } from 'react-redux';
import Errors from './errors';

const mapStateToProps = state => ({
  errors: state.feed.errors,
});

const mapDispatchToProps = () => ({});

const VisibleErrors = connect(
  mapStateToProps,
  mapDispatchToProps
)(Errors);

export default VisibleErrors;