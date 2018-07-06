// @flow
import { connect } from 'react-redux';

import PlaceHolder from './placeholder';
import { getRaisedHandCount } from './dux';

const mapStateToProps = state => {
  const placeHolderState = state.placeHolder;
  return {
    raisedHandCount: getRaisedHandCount(placeHolderState),
  }
};

const VisiblePlaceHolder = connect(mapStateToProps, (PlaceHolder));

export default VisiblePlaceHolder;
