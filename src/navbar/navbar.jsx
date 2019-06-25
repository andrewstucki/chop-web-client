// @flow
import React, { useRef } from 'react';
import Actionable from '../components/Actionable';
import TabOverflow from '../icons/tabOverflow';
import NavbarPip from './navbarPip';
import NavbarItem from './navbarItem';
import type { NavbarItemType } from './dux';
import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';
import { TAB, type TabType } from '../pane/content/tab/dux';
import { PRIMARY_PANE } from '../pane/dux';
import { NavbarWrapper, InvertedTabOverflowWrapper, TabOverflowWrapper } from './styles';
import { useScroll } from '../hooks';

type NavbarProps = {
  items: Array<NavbarItemType>,
  isHost: boolean,
  setPaneToEvent: (name: string, channelId: string) => void,
  setPaneToChat: (name: string, channelId: string) => void,
  setPaneToTab: (name: string, type: TabType) => void,
  setNavbarIndex: (index: number) => void,
  navbarIndex: number,
};

const Navbar = ( { items = [], setPaneToEvent, setPaneToChat, setPaneToTab, setNavbarIndex, navbarIndex, isHost }: NavbarProps) => {
  const wrapper = useRef<?HTMLElement>();
  const itemWithActions = useRef<?HTMLElement>();
  const itemsHaveActions = items.filter(item => item.hasActions).length > 0;
  const filteredItems = isHost ? items : items.filter(item => item.name !== 'Host' && item.name !== 'HOST_INFO');

  const handleItemClick = (event:SyntheticMouseEvent<HTMLButtonElement>, item: NavbarItemType):void => {
    const { index } = event.currentTarget.dataset;
    const newIndex = parseInt(index);

    if (navbarIndex !== newIndex) {
      setNavbarIndex(newIndex);
    }

    switch (item.type) {
      case EVENT:
        setPaneToEvent(PRIMARY_PANE, item.id);
        break;
      case CHAT:
        setPaneToChat(PRIMARY_PANE, item.id);
        break;
      case TAB:
        if (item.tabType) {
          setPaneToTab(PRIMARY_PANE, item.tabType);
        }
        break;
    }
  };

  const { current: scrollArea } = wrapper;
  const { scrollLeft } = useScroll(wrapper);

  const showLeftIndicator = scrollLeft > 0;
  const showRightIndicator = ((scrollArea && scrollArea.scrollWidth > window.innerWidth) && (scrollArea && scrollArea.scrollWidth - scrollLeft !== window.innerWidth));

  // Scroll enough so that the scroll-snap kicks in
  const handleScrollLeft = () => {
    if (scrollArea) {
      scrollArea.scrollLeft = scrollArea.scrollLeft - 50;
    }
  };

  const handleScrollRight = () => {
    if (scrollArea) {
      scrollArea.scrollLeft = scrollArea.scrollLeft + 50;
    }
  };

  const showLeftPip = itemWithActions.current && itemWithActions.current.getBoundingClientRect().left < 0;
  const showRightPip = itemWithActions.current && itemWithActions.current.getBoundingClientRect().left > window.innerWidth;

  return (
    // $FlowFixMe
    <NavbarWrapper ref={wrapper} data-testid='navbar'>
      { showLeftIndicator &&
        <Actionable onClick={handleScrollLeft}>
          <InvertedTabOverflowWrapper>
            <TabOverflow />
            { showLeftPip && <NavbarPip hasActions={itemsHaveActions} /> }
          </InvertedTabOverflowWrapper>
        </Actionable>
      }
      {
        filteredItems.map((item, index) => (
          <NavbarItem
            ref={itemWithActions}
            key={index}
            item={item}
            index={index}
            handleItemClick={event => handleItemClick(event, item)}
          />
        ))
      }
      { showRightIndicator &&
        <Actionable onClick={handleScrollRight}>
          <TabOverflowWrapper>
            <TabOverflow/>
            { showRightPip && <NavbarPip hasActions={itemsHaveActions} /> }
          </TabOverflowWrapper>
        </Actionable>
      }
    </NavbarWrapper>
  );
};

export default React.memo < NavbarProps > (Navbar);
