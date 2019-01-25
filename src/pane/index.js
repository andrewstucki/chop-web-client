//@flow
import Pane from './pane';
import { connect } from 'react-redux';
import { paneContentSelector, previousPaneContentSelector, getPane } from '../selectors/paneSelectors';
import { updatePaneAnimation } from './dux';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { navbarIndex } = feedState;
  const { name } = ownProps;
  const active = paneContentSelector(feedState, name);
  const previous = previousPaneContentSelector(feedState, name);
  const pane = getPane(feedState, name);
  const { isAnimating } = pane;

  return {
    name,
    active,
    previous,
    navbarIndex,
    isAnimating,
  };
};

const mapDispatchToProps = dispatch => (
  {
    updatePaneAnimation: (name, isAnimating) => dispatch(updatePaneAnimation(name, isAnimating)),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pane);
