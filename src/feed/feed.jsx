// @flow
import React from 'react';
import BezierEasing from 'bezier-easing';

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
  showLeaveChat: boolean,
  togglePopUpModal: () => void,
};

type SnapshotType = {
  scroll: boolean,
};

type RefObject = { current: any };

type FeedState = {
  height: number,
  top: string,
};

class Feed extends React.Component<FeedProps, FeedState> {
  listRef: RefObject
  wrapperRef: RefObject
  height: number

  constructor (props: FeedProps) {
    super(props);
    // $FlowFixMe
    this.listRef = React.createRef();
    // $FlowFixMe
    this.wrapperRef = React.createRef();
    // $FlowFixMe
    this.easeout = BezierEasing(0.2, 0.7, 0.4, 1);
  }

  // NOTE: Animations have been removed temporarily until they can be fixed
  // You can find the old code in commit ebb49cb3a96b3bb69e2475b120f99b0e842622d2
  // These two lines temporarily make sure your at the bottom of the feed
  scroll () {
    setTimeout(() => {
      if (this.listRef.current) {
        const listRect = this.listRef.current.getBoundingClientRect();
        const listHeight = listRect.height;
        this.wrapperRef.current.scrollTop = listHeight;
      }
    }, 300);
  }

  getSnapshotBeforeUpdate (prevProps: FeedProps) {
    if (prevProps.moments.length < this.props.moments.length) {
      return { scroll: true };
    }
    return { scroll: false };
  }

  componentDidMount () {
    this.scroll();
  }

  componentDidUpdate (prevProps: FeedProps, prevState: FeedState, snapshot: SnapshotType) {
    if (snapshot.scroll ||
        this.height !== this.wrapperRef.current.getBoundingClientRect().height) {
      this.scroll();
    }
    this.height = this.wrapperRef.current.getBoundingClientRect().height;
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
            // $FlowFixMe
            ref={this.listRef}
            key={currentChannel}
            className={styles.feed}
          >
            {anchorMomentListItems}
            <span style={{margin: '0 8px 0'}}>{momentListItems}</span>
          </ul>
        </div>
      </div>
    );
  }
}

export default Feed;
