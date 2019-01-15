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

const NO_SCROLL = 'NO_SCROLL';
const SCROLL_TO = 'SCROLL_TO';

type ScrollType =
  | typeof NO_SCROLL
  | typeof SCROLL_TO;

type ScrollToType = {
  type: typeof SCROLL_TO,
  position: number,
};

type NoScrollType = {
  type: typeof NO_SCROLL,
};;

type Scroll =
  | ScrollToType
  | NoScrollType;

const scrollAction = (position?: number): Scroll => {
  if (position === 'number') {
    return {
      type: SCROLL_TO,
      position,
    }
  } else {
    return {
      type: NO_SCROLL,
    }
  }
}

type FeedProps = {
  moments: Array<MomentType>,
  anchorMoments: Array<AnchorMomentType>,
  currentChannel: string,
  channel: string,
  showLeaveChat: boolean,
  currentUser: PrivateUserType,
  togglePopUpModal: () => void,
  updateScrollPosition: (scrollPosition: number, channel: string) => void,
  setSawLastMomentAt: (timestamp: DateTimeType, channelId: ChannelIdType) => void,
  showNewMessageButton: boolean,
  isChatFocused: boolean,
  scroll: Scroll,
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
    // $FlowFixMe
    this.listRef = React.createRef();
  }

  saveScrollPosition = () => {
    const { channel } = this.props;
    const { current:list } = this.listRef;
    const { current:scrollWrapper } = this.wrapperRef;

    if (channel !== undefined) {
      const scrollPosition = (list.scrollHeight - (Math.floor(scrollWrapper.getBoundingClientRect().height) + scrollWrapper.scrollTop))
      this.props.updateScrollPosition(
        scrollPosition,
        channel
      );
    }
  };

  setScrollPositionToBottom = () => {
    const { channel } = this.props;
    if (channel !== undefined) {
      this.props.updateScrollPosition(
        0,
        channel
      );
    }
  }

  scrollTo = (position) => {
    const { current:scrollWrapper } = this.wrapperRef;
    const { current:list } = this.listRef;

    const x = list.scrollHeight - (Math.floor(scrollWrapper.getBoundingClientRect().height) + position)
    
    scrollWrapper.scrollTop = x;
  }

  scroll = () => {
    const { scroll } = this.props;
    switch (scroll.type) {
    case SCROLL_TO:
      this.scrollTo(scroll.position);
    case NO_SCROLL:
    default:
      // no op
    }
  }

  // React Lifecycle functions

  componentDidMount () {
    this.scroll();
  }

  componentDidUpdate () {
    this.scroll();
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
    const lastIndex = moments.length - 1;
    const momentListItems = moments.map((moment, index) => (
      // $FlowFixMe
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
          onScroll={this.saveScrollPosition}
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
              ref={this.listRef}
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
              <Button onClick={this.setScrollPositionToBottom} buttonStyle='secondary' text='New Messages' small />
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default Feed;
