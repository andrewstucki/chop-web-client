//@flow
import Pane from './pane';
import { connect } from 'react-redux';
import { paneContentSelector } from '../selectors/paneSelectors';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { navbarIndex, prevNavbarIndex } = feedState;
  const { name } = ownProps;
  const pane = paneContentSelector(feedState, name);

  return {
    name,
    pane,
    navbarIndex,
    prevNavbarIndex,
  };
};

export default connect(
  mapStateToProps,
)(Pane);
