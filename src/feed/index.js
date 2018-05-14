// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedContents,
} from './dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    moments: feedContents(feedState),
    offset: feedState.offset,
  };
};


const mapDispatchToProps = () => (
  {}
);

const VisibleFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default VisibleFeed;
