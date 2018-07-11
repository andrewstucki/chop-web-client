// @flow
import React from 'react';
import type { MomentType } from '../moment/dux';
import Moment from '../moment/moment';
import styles from './styles.css';
import BezierEasing from 'bezier-easing';

type FeedProps = {
  moments: Array<MomentType>,
  currentChannel: string,
  appendingMessage: boolean,
  renderingAnchorMoment: boolean,
  placeholderPresent: boolean,
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
    // if the list extends past the feed the height is wrapperHeight
    // and top is 0
    // if the list is smaller than the feedHeight then height is listHeight
    // and top is 100% - listHeight
    // top sets the ul's top & height is used to determine if the feed is full
    // and if the list height extends past the feed
    this.state = {
      height: 0,
      top: '100%',
    };
    // $FlowFixMe
    this.easeout = BezierEasing(0.2, 0.7, 0.4, 1);
  }

  scrollUntilDone (shouldKeepScrolling: () => number): Promise<void> {
    const prom = new Promise(resolve => {
      const scroll = () => {
        // $FlowFixMe 
        this.wrapperRef.current.scrollBy(0, Math.ceil(this.easeout(shouldKeepScrolling()) * 4) || 1);
        if (shouldKeepScrolling() < 1) {
          window.requestAnimationFrame(scroll);
        } else {
          resolve();
        }
      };
      scroll();
    });
    return prom;
  }

  scrollInstant (): Promise<void> {
    const prom = new Promise(resolve => {
      this.wrapperRef.current.scroll({
        top: this.state.height,
        behavior: 'instant',
      });
      resolve();
    });
    return prom;
  }

  componentDidUpdate () {
    const list = this.listRef.current;
    const listHeight = list.scrollHeight;
    const wrapper = this.wrapperRef.current;
    const wrapperHeight = Math.ceil(wrapper.getBoundingClientRect().height);
    const start = wrapper.scrollTop;
    const end = wrapper.scrollHeight - wrapperHeight;
    const rangeEnd = end - start;
    // if the list height doesn't extend past the feed and
    // if the feed isn't full
    if (listHeight !== this.state.height &&
        wrapperHeight !== this.state.height) {
      let promise;
      if (!this.props.renderingAnchorMoment) {
        promise = this.scrollUntilDone(
          () => ((wrapper.scrollTop - start) / rangeEnd)
        );
      } else {
        promise = this.scrollInstant();
      }
      promise.then(() => {
        // if the list extends past the feed 
        if (listHeight > wrapperHeight) {
          this.setState(
            {
              height: wrapperHeight,
              top: '0px',
            }
          );
        } else {
          this.setState(
            {
              height: listHeight,
              top: `calc(100% - ${listHeight}px)`,
            }
          );
        }
      });
      // if the feed is full and you're publishing a message
    } else if (this.state.top === '0px' && this.props.appendingMessage) {
      const newestMessage = list.lastChild.firstChild;
      const messageHeight = Math.ceil(newestMessage.getBoundingClientRect().height);
      const marginTop = parseInt(window.getComputedStyle(newestMessage)['margin-top'], 10);
      const messageTotalHeight = messageHeight + marginTop;
      // if the wrapper's scrollable height - (the wrapper's visible height + the next message's total height)
      // is greater than the position the wrapper is scrolled to
      // checks to see how far above the wrapper and incoming messages the list goes
      // and if it's a greater number than where the user is scrolled to
      console.log(wrapper.scrollHeight - (wrapperHeight + messageTotalHeight), wrapper.scrollTop);
      if (wrapper.scrollHeight - (wrapperHeight + messageTotalHeight) >
        wrapper.scrollTop) {
        wrapper.scroll({
          top: wrapper.scrollHeight - (wrapperHeight + messageTotalHeight),
          behavior: 'instant',
        });
      }
      if (!this.props.renderingAnchorMoment) {
        const self = this;
        window.requestAnimationFrame(
          () => {
            self.scrollUntilDone(
              () => ((wrapper.scrollTop - start) / rangeEnd)
            );
          }
        );
      }
    }
  }

  render () {
    const { currentChannel, moments, placeholderPresent } = this.props;
    const feedStyle =
      currentChannel === 'host' && placeholderPresent ?
        styles.withPlaceholder : styles.withoutPlaceholder;

    const listItems = moments.map(moment => (
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
        <ul
          // top starts at 100% (the bottom) and gets smaller as list grows
          style={{top: this.state.top}}
          // $FlowFixMe
          ref={this.listRef}
          key={currentChannel}
          className={styles.feed}
        >
          {listItems}
        </ul>
      </div>
    );
  }
}

export default Feed;

// end goal is to not run an animation if rendering an anchorMoment in the feed
// and don't scroll to the anchorMoment if user has scrolled manually
