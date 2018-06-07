// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedContents,
  appendMessage,
  openMessageTray,
  getTrayStatus,
} from './dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    moments: feedContents(feedState),
    channel: feedState.currentChannel,
    appendingMessage: appendMessage(feedState),
    messageTrayOpen: getTrayStatus(feedState),
  };
};

const mapDispatchToProps = dispatch => ({
  trayButtonOnClick: () => dispatch(openMessageTray()),
});

const VisibleFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default VisibleFeed;
