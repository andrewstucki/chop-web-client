// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedContents,
  updateOffset,
} from './dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    moments: feedContents(feedState),
    offset: feedState.offset,
  };
};

const mapDispatchToProps = dispatch => (
  {
    onMessageRender: offset => dispatch(updateOffset(offset)),
  }
);

const VisibleFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default VisibleFeed;
