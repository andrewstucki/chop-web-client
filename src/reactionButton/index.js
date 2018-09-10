// @flow
import { connect } from 'react-redux';
import ReactionButton from './reactionButton';
import { publishReaction } from './dux';

const mapStateToProps = parentState => {
  const state = parentState.feed;
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = dispatch => (
  {
    buttonClick: user => dispatch(publishReaction(user)),
  }
);

const VisibleReactionButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactionButton);

export default VisibleReactionButton;