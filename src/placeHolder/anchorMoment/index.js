// @flow
import { connect } from 'react-redux';

import AnchorMoment from './anchorMoment';
import { getRaisedHandCount } from './dux';

const mapStateToProps = state => {
  const anchorMomentState = state.anchorMoment;
  return {
    raisedHandCount: getRaisedHandCount(anchorMomentState),
  }
};

const VisibleAnchorMoment = connect(mapStateToProps, (AnchorMoment));

export default VisibleAnchorMoment;
