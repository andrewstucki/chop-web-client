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
import Tab from './content/tab';
import {TAB} from './content/tab/dux';

type PanePropsType = {
  name: string,
  active: PaneType,
  previous: PaneType,
  navbarIndex: number,
  updatePaneAnimation: (string, boolean) => void,
  isAnimating: boolean,
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
    const { navbarIndex:currentNavbarIndex, updatePaneAnimation, name,
      syncTransitionLeft, syncTransitionRight } = this.props;
    const { navbarIndex:prevNavbarIndex } = prevProps;
    const { current:currentPane } = this.currentPane;
    const { current:prevPane } = this.prevPane;

    if (currentPane && currentNavbarIndex !== prevNavbarIndex) {
      updatePaneAnimation(name, true);
      if (currentNavbarIndex > prevNavbarIndex) {
        syncTransitionLeft(currentPane, prevPane, this.removePreviousPane);
      } else {
        syncTransitionRight(currentPane, prevPane, this.removePreviousPane);
      }
    }
  }

  removePreviousPane = () => {
    const { name, updatePaneAnimation } = this.props;
    updatePaneAnimation(name, false);
  };

  renderPaneContent = (pane:PaneType) => {
    const { type, content } = pane;

    switch (type) {
    case EVENT:
      return (
        <Event />
      );
    case CHAT:
      return (
        // $FlowFixMe
        <Chat channel={content.channelId} />
      );
    case TAB:
      return (
        // $FlowFixMe
        <Tab type={content.type}/>
      );
    default:
      return null;
    }
  };

  render () {
    const { active, previous, isAnimating } = this.props;

    return (
      <PaneWrapper>
        <PaneContentWrapper
          offCanvas
          ref={this.prevPane}>
          { isAnimating && this.renderPaneContent(previous) }
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
