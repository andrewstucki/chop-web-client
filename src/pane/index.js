//@flow
import Pane from './pane';
import { connect } from 'react-redux';
import { paneContentSelector } from '../selectors/paneSelectors';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { name } = ownProps;
  const content = paneContentSelector(feedState, name);
  return {
    type: content.type,
    content,
  };
};

export default connect(
  mapStateToProps,
)(Pane);
