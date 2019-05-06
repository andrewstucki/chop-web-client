// @flow
/* global TimeoutID */
import React from 'react';
import type { PrivateUserType } from '../users/dux';

import type { MomentType } from '../moment/dux';
import type { AnchorMomentType } from '../anchorMoment/dux';
import type {
  DateTimeType,
  ChannelIdType,
} from '../cwc-types';

import Moment from '../moment/moment';
import AnchorMoment from '../anchorMoment';
import { createUid } from '../util';
import Button, {BUTTON_SECONDARY, BUTTON_SMALL} from '../components/button';
import { COMPACT } from '../textModeToggle/dux';
import { withTranslation } from 'react-i18next';
import { Wrapper, AnchorMomentWrapper, MomentList, AnchorMomentList, NewMessageButtonContainer, NewMessageButtonWrapper, ListContainer } from './styles';

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
  currentUser: PrivateUserType,
  updateScrollPosition: (scrollPosition: number, channel: string, timestamp: number) => void,
  setSawLastMomentAt: (timestamp: DateTimeType, channelId: ChannelIdType) => void,
  showNewMessageButton: boolean,
  scroll: Scroll,
  textMode: string,
};

type RefObject = { current: any };

class Feed extends React.Component<FeedProps> {
  wrapperRef: RefObject;
  listRef: RefObject;
  saveScrollPosition: (channel: string) => void;
  isScrolling: TimeoutID;

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
  };

  scrollTo = (position: number) => {
    const { current:scrollWrapper } = this.wrapperRef;
    const { current:list } = this.listRef;

    if (scrollWrapper && list) {
      const scrollTop = list.scrollHeight - (Math.floor(scrollWrapper.getBoundingClientRect().height) + position);

      scrollWrapper.scrollTop = scrollTop;
    }
  };

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
  };

  detectScroll = () => {
    window.clearTimeout(this.isScrolling);
    this.isScrolling = setTimeout(() => {
      this.saveScrollPosition();
    }, 100);
  };

  componentDidMount (): void {
    const { current } = this.wrapperRef;
    if (current) {
      current.addEventListener('scroll', this.detectScroll, { passive: true });
      if (Math.round(this.listRef.current.scrollHeight) - Math.round(current.getBoundingClientRect().height) === 0) {
        this.saveScrollPosition();
      }
    }
    this.scroll();
  }

  componentDidUpdate (): void {
    this.scroll();
  }

  componentWillUnmount (): void {
    const { current } = this.wrapperRef;
    window.clearTimeout(this.isScrolling);
    if (current) {
      current.removeEventListener('scroll', this.detectScroll);
    }
  }

  render () {
    const {
      currentChannel,
      moments,
      anchorMoments,
      showNewMessageButton,
      textMode,
    } = this.props;

    const hasAnchorMoments = anchorMoments?.length > 0;
    const momentLiStyle = { margin: '0 8px' };

    const momentListItems = moments.reverse().map((moment: MomentType) => (
      // $FlowFixMe
      <li key={moment.id || createUid()} style={momentLiStyle}>
        <Moment
          currentChannel={currentChannel}
          data={moment}
          isCompact={textMode === COMPACT}
        />
      </li>
    ));
    const anchorMomentListItems = anchorMoments.map(anchorMoment => (
      <li key={anchorMoment.id}>
        <AnchorMoment
          currentChannel={currentChannel}
          anchorMoment={anchorMoment}
          isAnchorMomentAnchored={true}
        />
      </li>
    ));
    return (
      <React.Fragment>
        <Wrapper
          data-testid='feed'
          // $FlowFixMe
          ref={this.wrapperRef}
        >
          <ListContainer>
            <MomentList
              data-testid='feed-momentList'
              ref={this.listRef}
              key={currentChannel}
            >
              {momentListItems}
            </MomentList>
          </ListContainer>
        </Wrapper>
        { showNewMessageButton &&
          <NewMessageButtonContainer data-testid='feed-newMessages'>
            <NewMessageButtonWrapper>
              <Button
                onClick={this.setScrollPositionToBottom}
                variant={BUTTON_SECONDARY}
                size={BUTTON_SMALL}>
                {/*$FlowFixMe - TODO: withTranslation() adds this prop, how do we do this with Flow? */}
                { this.props.t('new_messages') }
              </Button>
            </NewMessageButtonWrapper>
          </NewMessageButtonContainer>
        }
        { hasAnchorMoments &&
          <AnchorMomentWrapper>
            <ListContainer>
              <AnchorMomentList>
                {anchorMomentListItems}
              </AnchorMomentList>
            </ListContainer>
          </AnchorMomentWrapper>
        }
      </React.Fragment>
    );
  }
}

const EnhancedFeed = withTranslation()(Feed);
export default React.memo < FeedProps > (EnhancedFeed);
