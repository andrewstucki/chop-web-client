// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedContents,
  getOffset,
  updateOffset,
} from './dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    moments: feedContents(feedState),
    offset: getOffset(feedState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    onMessageRender: (offset, id) => dispatch(updateOffset(offset, id)),
  }
);

const VisibleFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default VisibleFeed;
