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
    channel: feedState.currentChannel,
  };
};

const VisibleFeed = connect(
  mapStateToProps
)(Feed);

export default VisibleFeed;
