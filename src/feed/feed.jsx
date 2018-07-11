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

  componentDidUpdate () {
    const list = this.listRef.current;
    const listHeight = list.scrollHeight;
    const wrapper = this.wrapperRef.current;
    const wrapperHeight = Math.ceil(wrapper.getBoundingClientRect().height);
    const start = wrapper.scrollTop;
    const end = wrapper.scrollHeight - wrapperHeight;
    const rangeEnd = end - start;
    if (listHeight !== this.state.height &&
        wrapperHeight !== this.state.height) {
      // if rendering an anchorMoment don't run this code
      // run the instant code instead
      if (!this.props.renderingAnchorMoment) {
        this.scrollUntilDone(
          () => ((wrapper.scrollTop - start) / rangeEnd)
          // going to need this no matter what
        ).then(() => {
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
        }
        );
      }
      // wrapper.scroll({
      //   top: wrapper.scrollHeight - (wrapperHeight + messageTotalHeight),
      //   behavior: 'instant',
      // }).then(() => {
      //   if (listHeight > wrapperHeight) {
      //     this.setState(
      //       {
      //         height: wrapperHeight,
      //         top: '0px',
      //       }
      //     );
      //   } else {
      //     this.setState(
      //       {
      //         height: listHeight,
      //         top: `calc(100% - ${listHeight}px)`,
      //       }
      //     );
      //   }
      // }
      // );
    } else if (this.state.top === '0px' && this.props.appendingMessage) {
      const newestMessage = list.lastChild.firstChild;
      const messageHeight = Math.ceil(newestMessage.getBoundingClientRect().height);
      const marginTop = parseInt(window.getComputedStyle(newestMessage)['margin-top'], 10);
      const messageTotalHeight = messageHeight + marginTop;
      // check if a user has scrolled manually
      // if user has scrolled when you add anchor moment don't scroll at all
      if (wrapper.scrollHeight - (wrapperHeight + messageTotalHeight) >
        wrapper.scrollTop) {
        wrapper.scroll({
          top: wrapper.scrollHeight - (wrapperHeight + messageTotalHeight),
          behavior: 'instant',
        });
      }
      // don't do this if anchorMoment
      if (this.props.renderingAnchorMoment) {
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
