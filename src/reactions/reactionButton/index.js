// @flow
import { connect } from 'react-redux';
import ReactionButton from './reactionButton';
import { publishReaction } from './dux';
import { getCurrentSubscriber } from '../../subscriber/dux';

const mapStateToProps = state => (
  {
    currentSubscriber: getCurrentSubscriber(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    buttonClick: subscriber => dispatch(publishReaction(subscriber)),
  }
);

const VisibleReactionButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactionButton);

export default VisibleReactionButton;