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
import ActionBanner from '../components/actionBanner';
import styles from './styles.css';
import { createUid } from '../util';
import Button, {BUTTON_SECONDARY, BUTTON_SMALL} from '../components/button';

const NO_SCROLL = 'NO_SCROLL';
const SCROLL_TO = 'SCROLL_TO';

type ScrollToType = {
  type: typeof SCROLL_TO,
  position: number,
};

type NoScrollType = {
  type: typeof NO_SCROLL,
};

type Scroll =
  | ScrollToType
  | NoScrollType;

type FeedProps = {
  moments: Array<MomentType>,
  anchorMoments: Array<AnchorMomentType>,
  currentChannel: string,
  channel: string,
  showLeaveChat: boolean,
  currentUser: PrivateUserType,
  togglePopUpModal: () => void,
  updateScrollPosition: (scrollPosition: number, channel: string, timestamp: number) => void,
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
  listRef: RefObject;
  saveScrollPosition: (channel: string) => void;

  constructor (props: FeedProps) {
    super(props);
    this.wrapperRef = React.createRef();
    this.listRef = React.createRef();
  }

  saveScrollPosition = () => {
    const { channel } = this.props;
    const { current:list } = this.listRef;
    const { current:scrollWrapper } = this.wrapperRef;

    if (channel && list && scrollWrapper) {
      const scrollPosition = (list.scrollHeight - (Math.floor(scrollWrapper.getBoundingClientRect().height) + scrollWrapper.scrollTop));
      this.props.updateScrollPosition(
        scrollPosition,
        channel,
        Date.now()
      );
    }
  };

  setScrollPositionToBottom = () => {
    this.scrollTo(0);
  }

  scrollTo = (position: number) => {
    const { current:scrollWrapper } = this.wrapperRef;
    const { current:list } = this.listRef;

    if (scrollWrapper && list) {
      const scrollTop = list.scrollHeight - (Math.floor(scrollWrapper.getBoundingClientRect().height) + position);

      scrollWrapper.scrollTop = scrollTop;
    }
  }

  scroll = () => {
    const { scroll } = this.props;
    switch (scroll.type) {
    case SCROLL_TO:
      this.scrollTo(scroll.position);
      break;
    case 'DELAY_SCROLL_TO':
      setTimeout(() => this.scrollTo(scroll.position), 500);
      break;
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
    const momentListItems = moments.map((moment: MomentType) => (
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
              <ActionBanner
                text="Leave"
                onClick={togglePopUpModal}
                primary
              />
          }
          <div style={{width: '100%'}}>
            <ul
              // $FlowFixMe
              ref={this.listRef}
              key={currentChannel}
              className={styles.feed}
            >
              <span style={{margin: '0 8px 0'}}>{momentListItems}</span>
            </ul>
          </div>
        </div>
        { showNewMessageButton &&
          <div className={styles.newMessageButtonContainer}>
            <div className={styles.newMessageButtonWrapper}>
              <Button
                onClick={this.setScrollPositionToBottom}
                variant={BUTTON_SECONDARY}
                size={BUTTON_SMALL}>
                New Messages
              </Button>
            </div>
          </div>
        }
        { hasAnchorMoments &&
          <div className={styles.nonScroll}>
            <div style={{width: '100%'}}>
              <ul className={styles.anchorMoments}>
                {anchorMomentListItems}
              </ul>
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default React.memo < FeedProps > (Feed);
