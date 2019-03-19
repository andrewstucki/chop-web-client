//@flow
import React from 'react';
import type { PaneType } from './dux';
import { CHAT } from './content/chat/dux';
import Chat from './content/chat';
import { EVENT } from './content/event/dux';
import Event from './content/event';
import { PaneWrapper, PaneContentWrapper } from './styles';
import hash from 'object-hash';
import { useTransition } from 'react-spring';
import { TAB } from './content/tab/dux';
import Tab from './content/tab';
import { Small, MediumUp } from '../util/responsive';
import { isEmpty } from '../util';

type PanePropsType = {
  name: string,
  isMediumPlusUp: boolean,
  pane: PaneType,
  navbarIndex: number,
  prevNavbarIndex: number,
  hostChannel: string,
  setPaneToChat: (pane:string, channel:string) => void,
};

const renderPaneContent = (pane:PaneType) => {
  const { type, content } = pane;
  switch (type) {
    case EVENT:
      return <Event />;
    case CHAT:
    // $FlowFixMe
      return <Chat channel={content.channelId} />;
    case TAB:
    // $FlowFixMe
      return <Tab type={content.type}/>;
    default:
      return null;
  }
};

const Pane = ({ isMediumPlusUp, name, pane, navbarIndex, prevNavbarIndex, setPaneToChat, hostChannel }:PanePropsType) => {
  const direction = navbarIndex > prevNavbarIndex;
  const transitions = useTransition(pane, hash(pane), {
    from: { transform: direction ? 'translate3d(100%,0,0)' : 'translate3d(-100%,0,0)' },
    enter: { transform: direction ? 'translate3d(0,0,0)' : 'translate3d(0,0,0)' },
    leave: { transform: direction ? 'translate3d(-100%,0,0)' : 'translate3d(100%,0,0)' },
    immediate: prevNavbarIndex === undefined,
  });

  // Prevent two EVENT panes on Medium+
  if (isMediumPlusUp && pane.type === EVENT && !isEmpty(hostChannel)) {
    setPaneToChat(name, hostChannel);
    return null;
  }

  return (
    <PaneWrapper data-testid='pane'>
      <Small>
        { transitions.map(({ item:pane, props, key }) => (
          <PaneContentWrapper
            key={key}
            style={props}>
            {renderPaneContent(pane)}
          </PaneContentWrapper>)
        )}
      </Small>
      <MediumUp>
        <PaneContentWrapper>
          {renderPaneContent(pane)}
        </PaneContentWrapper>
      </MediumUp>
    </PaneWrapper>
  );
};

export default React.memo < PanePropsType > (Pane);
