//@flow
import React, { Component } from 'react';
import type { PaneType } from './dux';
import { CHAT } from './content/chat/dux';
import Chat from './content/chat';
import { EVENT } from './content/event/dux';
import Event from './content/event';
import { withSlideTransitions } from '../animations';
import type { WithSlideTransitionsType } from '../animations';
import { PaneWrapper, PaneContentWrapper } from './styles';

type PanePropsType = {
  active: PaneType,
  previous: PaneType,
  navbarIndex: number,
  ...WithSlideTransitionsType,
};

@withSlideTransitions
class Pane extends Component<PanePropsType> {
  prevPane: { current: any };
  currentPane: { current: any };

  constructor (props:PanePropsType) {
    super(props);
    this.prevPane = React.createRef();
    this.currentPane = React.createRef();
  }

  componentDidUpdate (prevProps:PanePropsType): void {
    const { navbarIndex:currentNavbarIndex } = this.props;
    const { navbarIndex:prevNavbarIndex } = prevProps;
    const { current:currentPane } = this.currentPane;
    const { current:prevPane } = this.prevPane;

    if (prevPane && currentPane && currentNavbarIndex !== prevNavbarIndex) {
      if (currentNavbarIndex > prevNavbarIndex) {
        this.props.syncTransitionLeft(currentPane, prevPane);
      } else {
        this.props.syncTransitionRight(currentPane, prevPane);
      }
    }
  }

  renderPaneContent = (pane:PaneType) => {
    const { type, content } = pane;

    switch (type) {
    case EVENT:
      return (
        <Event />
      );
    case CHAT:
      return (
        <Chat channel={content.channelId} />
      );
    default:
      return null;
    }
  };

  render () {
    const { active, previous } = this.props;

    return (
      <PaneWrapper>

        <PaneContentWrapper
          offCanvas
          ref={this.prevPane}>
          { this.renderPaneContent(previous) }
        </PaneContentWrapper>

        <PaneContentWrapper
          ref={this.currentPane}>
          { this.renderPaneContent(active) }
        </PaneContentWrapper>

      </PaneWrapper>
    );
  }
}

export default Pane;
