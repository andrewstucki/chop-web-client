//@flow
import Pane from './pane';
import { connect } from 'react-redux';
import {paneContentSelector, previousPaneContentSelector} from '../selectors/paneSelectors';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { navbarIndex } = feedState;
  const { name } = ownProps;
  const active = paneContentSelector(feedState, name);
  const previous = previousPaneContentSelector(feedState, name);

  return {
    active,
    previous,
    navbarIndex,
  };
};

export default connect(
  mapStateToProps,
)(Pane);
