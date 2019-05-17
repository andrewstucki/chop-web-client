// @flow
import { connect } from 'react-redux';
import Errors from './errors';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    errors: feedState.errors,
  };
};

const mapDispatchToProps = () => ({});

const VisibleErrors = connect(
  mapStateToProps,
  mapDispatchToProps
)(Errors);

export default VisibleErrors;