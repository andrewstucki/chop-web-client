// @flow
import React from 'react';
import type { PrivateUserType } from './dux';

import type { MomentType } from '../moment/dux';
import type { AnchorMomentType } from '../anchorMoment/dux';
import type {
  DateTimeType,
  ChannelIdType,
} from '../cwc-types';

import Moment from '../moment/moment';
import AnchorMoment from '../anchorMoment/';
import FeedActionBanner from './feedActionBanner';
import styles from './styles.css';
import { createUid } from '../util';
import Button from '../components/button';
 
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
  setSawLastMomentAt: (timestamp: DateTimeType, channelId: ChannelIdType) => void,
  showNewMessageButton: boolean,
  isChatFocused: boolean,
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
  saveScrollPosition: (channel: string) => void;
  scrollToBottom: void => void;
  maxScrollTop: void => number;


  constructor (props: FeedProps) {
    super(props);
    // $FlowFixMe
    this.wrapperRef = React.createRef();
  }

  scrollPosition () {
    let { scrollTop } = this.wrapperRef.current;
    const maxScrollTop = this.maxScrollTop();
    scrollTop = (scrollTop > 0) ? scrollTop : 0;
    return (scrollTop < maxScrollTop) ? scrollTop : maxScrollTop;
  }

  saveScrollPosition = (channel: string) => {
    if (channel !== undefined) {
      const scrollPosition = this.scrollAtBottom() ? -1 : this.scrollPosition();

      this.props.updateScrollPosition(
        scrollPosition, 
        channel
      );
      if (scrollPosition === -1) {
        this.props.setSawLastMomentAt(
          Date.now(),
          channel
        );
      }
    }
  }

  componentDidMount () {
    const { scrollPosition } = this.props;
    const { current:scrollWrapper } = this.wrapperRef;
    if (scrollWrapper) {
      if ((scrollPosition || scrollPosition === 0) && scrollPosition !== -1) {
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
    const scrollAtBottom = this.scrollAtBottom() || this.props.scrollPosition === -1;
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

  scrollAtBottom () {
    const { current:scrollWrapper } = this.wrapperRef;
    const { scrollTop, scrollHeight, clientHeight } = scrollWrapper;
    const scrollBottom = scrollHeight - clientHeight;
    return (scrollBottom <= 0) || (scrollTop === scrollBottom);
  }

  componentDidUpdate (prevPros: FeedProps, prevState: FeedState, snapshot: SnapshotType) {
    const { momentAdded, scrollAtBottom, channelChanged, lastMessageFromCurrentUser } = snapshot;
    const { current:scrollWrapper } = this.wrapperRef;
    const { scrollPosition } = this.props;
    if (channelChanged && scrollWrapper && scrollPosition !== -1) {
      scrollWrapper.scrollTop = scrollPosition;
    } else if (channelChanged && scrollWrapper && scrollPosition === -1) {
      this.scrollToBottom();
    } else if (momentAdded && (scrollAtBottom || lastMessageFromCurrentUser)) {
      this.scrollToBottom();
    } else if (this.props.isChatFocused && scrollAtBottom) {
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

  scrollToBottom = () => {
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
      showNewMessageButton,
    } = this.props; 

    const hasAnchorMoments = anchorMoments?.length > 0;

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
      // $FlowFixMe Fragment has been added to flow 0.7.1 so we need to upgrade
      <React.Fragment>
        <div
          data-component="feed"
          // $FlowFixMe
          ref={this.wrapperRef}
          className={styles.scroll}
          onScroll={() => this.saveScrollPosition(currentChannel)}
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
          </div>
        </div>
        { hasAnchorMoments &&
          <div className={styles.nonScroll}>
            <div style={{width: '100%'}}>
              <ul className={styles.anchorMoments}>
                {anchorMomentListItems}
              </ul>
            </div>
          </div>
        }
        { showNewMessageButton &&
          <div className={styles.newMessageButtonContainer
          }>
            <div className={styles.newMessageButtonWrapper}>
              <Button onClick={this.scrollToBottom} buttonStyle='secondary' text='New Messages' small />
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default Feed;
