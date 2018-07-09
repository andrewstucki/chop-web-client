// @flow
import { connect } from 'react-redux';

import {
  getRaisedHandCount,
} from './dux';
import { releaseAnchorMoment } from './anchorMoment/dux';

import PlaceHolder from './placeholder';

const mapStateToProps = state => {
  const placeholderState = state.placeHolder;
  return {
    raisedHandCount: getRaisedHandCount(placeholderState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    releaseAnchorMoment: anchorMoment => dispatch(releaseAnchorMoment(anchorMoment)),
  }
);

const VisiblePlaceHolder = connect(
  mapStateToProps,
  mapDispatchToProps,
  (PlaceHolder)
);

export default VisiblePlaceHolder;
