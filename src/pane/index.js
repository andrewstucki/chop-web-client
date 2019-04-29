//@flow
import Pane from './pane';
import { connect } from 'react-redux';
import { paneContentSelector } from '../selectors/paneSelectors';
import { setPaneToChat } from './content/chat/dux';
import { setPaneToTab } from './content/tab/dux';
import { getHostChannel } from '../selectors/channelSelectors';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { navbarIndex, prevNavbarIndex } = feedState;
  const { name, isLarge = false, isXlarge = false } = ownProps;
  const pane = paneContentSelector(feedState, name);
  const hostChannel = getHostChannel(feedState);

  return {
    name,
    isLarge,
    isXlarge,
    pane,
    navbarIndex,
    prevNavbarIndex,
    hostChannel,
  };
};

const mapDispatchToProps = dispatch => ({
  setPaneToChat: (name, channelId) => (dispatch(setPaneToChat(name, channelId))),
  setPaneToTab: (name, type) => (dispatch(setPaneToTab(name, type))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pane);
