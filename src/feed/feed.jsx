// @flow
import React from 'react';
import BezierEasing from 'bezier-easing';

import type { MomentType } from '../moment/dux';

import Moment from '../moment/moment';
import FeedActionBanner from './feedActionBanner';
import styles from './styles.css';

type FeedProps = {
  moments: Array<MomentType>,
  currentChannel: string,
  appendingMessage: boolean,
  animatingMoment: boolean,
  isPlaceholderPresent: boolean,
  hasParticipants: boolean,
  togglePopUpModal: () => void,
};

type RefObject = { current: any };

type FeedState = {
  height: number,
  top: string,
};

class Feed extends React.Component<FeedProps, FeedState> {
  listRef: RefObject
  wrapperRef: RefObject

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
      const listRect = this.listRef.current.getBoundingClientRect();
      const listHeight = listRect.height;
      if (this.props.appendingMessage) {
        this.wrapperRef.current.scrollTop = listHeight;
      }
    }, 300);
  }

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
      isPlaceholderPresent,
      hasParticipants,
      togglePopUpModal,
    } = this.props;
    const feedStyle =
      currentChannel === 'host' && isPlaceholderPresent ?
        styles.withPlaceholder : styles.withoutPlaceholder;

    const listItems = moments.reverse().map(moment => (
      <li key={moment.id}>
        <Moment
          data={moment}
        />
      </li>
    ));

    return (
      <div
        data-component="feed"
        // $FlowFixMe
        ref={this.wrapperRef}
        className={feedStyle}
      >
        {
          hasParticipants &&
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
            {listItems}
          </ul>
        </div>
      </div>
    );
  }
}

export default Feed;
