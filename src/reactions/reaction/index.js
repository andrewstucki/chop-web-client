// @flow
import { connect } from 'react-redux';

import Reaction from './reaction';

import { removeReaction } from '../../feed/dux';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => (
  {
    removeReaction: id => dispatch(removeReaction(id)),
  }
);

const VisibleReaction = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reaction);

export default VisibleReaction;