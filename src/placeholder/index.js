// @flow
import { connect } from 'react-redux';

import { releaseAnchorMoment } from './anchorMoment/dux';

import PlaceHolder from './placeholder';

const mapDispatchToProps = dispatch => (
  {
    releaseAnchorMoment: () => dispatch(releaseAnchorMoment()),
  }
);

const VisiblePlaceHolder = connect(
  mapDispatchToProps,
  (PlaceHolder)
);

export default VisiblePlaceHolder;
