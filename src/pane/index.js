//@flow
import Pane from './pane';
import { content } from 'react-redux';
import { paneContentSelector } from '../selectors/paneSelectors';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { name } = ownProps;
  const content = paneContentSelector(name);
  return {
    type: content.type,
    content,
  };
};

export default connect(
  mapStateToProps,
)(Pane);
