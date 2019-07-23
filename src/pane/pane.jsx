//@flow
import React, { useEffect } from 'react';
import type { PaneType } from './dux';
import { CHAT } from './content/chat/dux';
import Chat from './content/chat';
import { EVENT } from './content/event/dux';
import Event from './content/event';
import { PaneWrapper, PaneContentWrapper } from './styles';
import hash from 'object-hash';
import { useTransition } from 'react-spring';
import { TAB } from './content/tab/dux';
import type { TabType } from './content/tab/dux';
import Tab from './content/tab';
import { HOST_INFO } from '../hostInfo/dux';
import { Small, MediumUp } from '../util/responsive';
import { isEmpty } from '../util';

type PanePropsType = {
  name: string,
  isLarge: boolean,
  isXlarge: boolean,
  pane: PaneType,
  navbarIndex: number,
  prevNavbarIndex: number,
  hostChannel: string,
  setPaneToChat: (pane:string, channel:string) => void,
  setPaneToTab: (name:string, type:TabType) => void,
};

const renderPaneContent = (pane:PaneType, hideReactions:boolean) => {
  const { type, content } = pane;
  switch (type) {
    case EVENT:
      return <Event />;
    case CHAT: 
      // $FlowFixMe
      return <Chat key={content.channelId} channel={content.channelId} hideReactions={hideReactions} />;
    case TAB:
    // $FlowFixMe
      return <Tab type={content.type}/>;
    default:
      return null;
  }
};

const Pane = ({ isLarge, isXlarge, name, pane, navbarIndex, prevNavbarIndex, setPaneToChat, setPaneToTab, hostChannel }:PanePropsType) => {
  const direction = navbarIndex > prevNavbarIndex;
  const hideReactions = isLarge || isXlarge;
  let animate = true;
  if (pane.type === CHAT) {
    ({ animate } = pane.content);
  }

  const transitions = useTransition(pane, hash(pane), {
    from: { transform: direction ? 'translate3d(100%,0,0)' : 'translate3d(-100%,0,0)' },
    enter: { transform: direction ? 'translate3d(0,0,0)' : 'translate3d(0,0,0)' },
    leave: { transform: direction ? 'translate3d(-100%,0,0)' : 'translate3d(100%,0,0)' },
    immediate: (prevNavbarIndex === undefined || !animate),
  });

  // Prevent two of the same panes
  useEffect(() => {
    if (isLarge && pane.type === EVENT && !isEmpty(hostChannel)) {
      setPaneToChat(name, hostChannel);
    } else if (isXlarge && (pane.type === EVENT || pane.content.channelId === hostChannel)) {
      setPaneToTab(name, HOST_INFO);
    }
  });

  return (
    <PaneWrapper data-testid='pane'>
      <Small>
        { transitions.map(({ item:pane, props, key }) => (
          <PaneContentWrapper
            key={key}
            style={props}>
            {renderPaneContent(pane, hideReactions)}
          </PaneContentWrapper>)
        )}
      </Small>
      <MediumUp>
        <PaneContentWrapper>
          {renderPaneContent(pane, hideReactions)}
        </PaneContentWrapper>
      </MediumUp>
    </PaneWrapper>
  );
};

export default React.memo < PanePropsType > (Pane);
