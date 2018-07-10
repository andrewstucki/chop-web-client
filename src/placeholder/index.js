// @flow
import { connect } from 'react-redux';

import { releaseAnchorMoment } from './anchorMoment/dux';
import { placeholderContents } from './dux';

import Placeholder from './placeholder';

const mapStateToProps = state => {
  const placeholderState = state.placeholder;
  return {
    anchorMoment: placeholderContents(placeholderState),
    renderPlaceholder: placeholderState.renderPlaceholder,
  };
};

const mapDispatchToProps = dispatch => (
  {
    releaseAnchorMoment: () => dispatch(releaseAnchorMoment()),
  }
);

const VisiblePlaceholder = connect(
  mapStateToProps,
  mapDispatchToProps
)(Placeholder);

export default VisiblePlaceholder;
