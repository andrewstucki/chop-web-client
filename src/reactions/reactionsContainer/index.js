// @flow
import { connect } from 'react-redux';

import ReactionsContainer from './reactionsContainer';

import {
  getReactions,
} from './dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    reactions: getReactions(feedState),
  };
};

const VisibleReactionsContainer = connect(
  mapStateToProps
)(ReactionsContainer);

export default VisibleReactionsContainer;