// @flow
import { connect } from 'react-redux';

import { getRaisedHandCount } from './dux';
import { releaseAnchorMoment } from './anchorMoment/dux';

import PlaceHolder from './placeholder';

const mapStateToProps = state => {
  const placeHolderState = state.placeHolder;
  return {
    raisedHandCount: getRaisedHandCount(placeHolderState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    releaseAnchorMoment: () => dispatch(releaseAnchorMoment()),
  }
);

const VisiblePlaceHolder = connect(
  mapStateToProps,
  mapDispatchToProps,
  (PlaceHolder)
);

export default VisiblePlaceHolder;
