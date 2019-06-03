// @flow
import { connect } from 'react-redux';

import ReactionsContainer from './reactionsContainer';

import {
  getReactions,
} from './dux';

const mapStateToProps = state => ({
  reactions: getReactions(state),
});

const VisibleReactionsContainer = connect(
  mapStateToProps
)(ReactionsContainer);

export default VisibleReactionsContainer;