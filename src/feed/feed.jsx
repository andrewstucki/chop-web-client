// @flow
import React from 'react';
import type { PrivateUserType } from './dux';

import type { MomentType } from '../moment/dux';
import type { AnchorMomentType } from '../anchorMoment/dux';

import Moment from '../moment/moment';
import AnchorMoment from '../anchorMoment/';
import FeedActionBanner from './feedActionBanner';
import styles from './styles.css';
import { createUid } from '../util';
 
type FeedProps = {
  moments: Array<MomentType>,
  anchorMoments: Array<AnchorMomentType>,
  currentChannel: string,
  channel: string,
  showLeaveChat: boolean,
  scrollPosition: number,
  currentUser: PrivateUserType,
  togglePopUpModal: () => void,
  updateScrollPosition: (scrollPosition: number, channel: string) => void,
};

type SnapshotType = {
  momentAdded: boolean,
  channelChanged: boolean,
  scrollAtBottom: boolean,
  lastMessageFromCurrentUser: boolean,
};

type RefObject = { current: any };

type FeedState = {
  height: number,
  top: string,
};

class Feed extends React.Component<FeedProps, FeedState> {
  wrapperRef: RefObject;

  constructor (props: FeedProps) {
    super(props);
    // $FlowFixMe
    this.wrapperRef = React.createRef();

    // $FlowFixMe
    this.saveScrollPosition = this.saveScrollPosition.bind(this);
    // $FlowFixMe
    this.scrollToBottom = this.scrollToBottom.bind(this);
    // $FlowFixMe
    this.maxScrollTop = this.maxScrollTop.bind(this);
  }

  saveScrollPosition (channel: string) {
    let { scrollTop } = this.wrapperRef.current;
    const maxScrollTop = this.maxScrollTop();
    scrollTop = (scrollTop > 0) ? scrollTop : 0;
    scrollTop = (scrollTop < maxScrollTop) ? scrollTop : maxScrollTop;

    this.props.updateScrollPosition(
      scrollTop, 
      channel
    );
  }

  componentDidMount () {
    const { scrollPosition } = this.props;
    const { current:scrollWrapper } = this.wrapperRef;
    if (scrollWrapper) {
      if (scrollPosition === 0 || scrollPosition) {
        scrollWrapper.scrollTop = scrollPosition;
      } else {
        this.scrollToBottom();
      }
    }
  }

  getSnapshotBeforeUpdate (prevProps: FeedProps) {
    const momentAdded = prevProps.moments.length < this.props.moments.length;
    const channelChanged = prevProps.channel !== this.props.channel;
    const lastMoment = this.props.moments[this.props.moments.length - 1];
    const lastMessageFromCurrentUser = lastMoment?.user?.pubnubToken === this.props?.currentUser?.pubnubToken;
    const { current:scrollWrapper } = this.wrapperRef;
    const { scrollTop, scrollHeight, clientHeight } = scrollWrapper;
    const scrollBottom = scrollHeight - clientHeight;
    const scrollAtBottom = (scrollBottom <= 0) || (scrollTop === scrollBottom);

    if (channelChanged && prevProps.channel) {
      this.saveScrollPosition(prevProps.channel);
    }

    return {
      momentAdded,
      channelChanged,
      scrollAtBottom,
      lastMessageFromCurrentUser,
    };
  }

  componentDidUpdate (props: FeedProps, state: FeedState, snapshot: SnapshotType) {
    const { momentAdded, scrollAtBottom, channelChanged, lastMessageFromCurrentUser } = snapshot;
    const { current:scrollWrapper } = this.wrapperRef;
    const { scrollPosition } = props;
    if (channelChanged && scrollWrapper) {
      scrollWrapper.scrollTop = scrollPosition;
    } else if (momentAdded && (scrollAtBottom || lastMessageFromCurrentUser)) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount () {
    this.saveScrollPosition(this.props.channel);
  }

  maxScrollTop () {
    const { current:scrollWrapper } = this.wrapperRef;
    const { scrollHeight } = scrollWrapper;
    const { clientHeight:height } = scrollWrapper;
    return scrollHeight - height;
  }

  scrollToBottom () {
    const { current:scrollWrapper } = this.wrapperRef;
    const maxScrollTop = this.maxScrollTop();
    scrollWrapper.scrollTop = (maxScrollTop > 0) ? maxScrollTop : 0;
  }

  render () {
    const {
      currentChannel,
      moments,
      anchorMoments,
      showLeaveChat,
      togglePopUpModal,
    } = this.props; 

    const momentListItems = moments.map(moment => (
      <li key={moment.id || createUid()}>
        
        <Moment
          data={moment}
        />
      </li>
    ));
    const anchorMomentListItems = anchorMoments.map(anchorMoment => (
      <li key={anchorMoment.id}>
        <AnchorMoment
          anchorMoment={anchorMoment}
          isAnchorMomentAnchored={true}
        />
      </li>
    ));
    return (
      <div
        data-component="feed"
        // $FlowFixMe
        ref={this.wrapperRef}
        className={styles.scroll}
      >
        {
          showLeaveChat &&
            <FeedActionBanner
              text="Leave"
              togglePopUpModal={togglePopUpModal}
            />
        }
        <div style={{width: '100%'}}>
          <ul
            key={currentChannel}
            className={styles.feed}
          >
            <span style={{margin: '0 8px 0'}}>{momentListItems}</span>
          </ul>
          <ul className={styles.anchorMoments}>
            {anchorMomentListItems}
          </ul>
        </div>
      </div>
    );
  }
}

export default Feed;
