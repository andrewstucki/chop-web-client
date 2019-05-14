// @flow
/* global SyntheticMouseEvent */
import React, { useRef } from 'react';
import Actionable from '../components/Actionable';
import DirectChatIcon from './directChatIcon';
import TabOverflow from '../icons/tabOverflow';
import type { NavbarItemType } from './dux';
import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';
import { TAB, type TabType } from '../pane/content/tab/dux';
import { PRIMARY_PANE } from '../pane/dux';
import { NavbarWrapper, NavbarItemWrapper, Pip, PipStyle, InvertedTabOverflowWrapper, TabOverflowWrapper } from './styles';
import { useTranslation } from 'react-i18next';
import { useScroll } from '../hooks';

type NavbarProps = {
  items: Array<NavbarItemType>,
  setPaneToEvent: (name: string, channelId: string) => void,
  setPaneToChat: (name: string, channelId: string) => void,
  setPaneToTab: (name: string, type: TabType) => void,
  setNavbarIndex: (index: number) => void,
  navbarIndex: number,
};

type NavbarItemProps = {
  item: NavbarItemType,
  index: number,
  handleItemClick: (event:SyntheticMouseEvent<HTMLButtonElement>, item: NavbarItemType) => void,
};

const Navbar = ( { items = [], setPaneToEvent, setPaneToChat, setPaneToTab, setNavbarIndex, navbarIndex }: NavbarProps) => {
  const wrapper = useRef<?HTMLElement>();
  const itemWithActions = useRef<?HTMLElement>();

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

  return (
    <NavbarWrapper ref={wrapper} data-testid='navbar'>
      {showLeftIndicator &&
        <Actionable onClick={handleScrollLeft}>
          <InvertedTabOverflowWrapper>
            <TabOverflow />
            { itemWithActions.current && itemWithActions.current.getBoundingClientRect().left < 0 && <NavbarPip /> }
          </InvertedTabOverflowWrapper>
        </Actionable>
      }
      {
        items.map((item, index) => (
          <MemoizedNavbarItem
            ref={itemWithActions}
            key={index}
            item={item}
            index={index}
            handleItemClick={event => handleItemClick(event, item)}
          />
        ))
      }
      {showRightIndicator &&
        <Actionable onClick={handleScrollRight}>
          <TabOverflowWrapper>
            <TabOverflow/>
            { itemWithActions.current && itemWithActions.current.getBoundingClientRect().left > window.innerWidth && <NavbarPip /> }
          </TabOverflowWrapper>
        </Actionable>
      }
    </NavbarWrapper>
  );
};

const NavbarItem = React.forwardRef(({ item, index, handleItemClick }:NavbarItemProps, ref) => {
  const { t } = useTranslation();
  const nameKey = (item.type === TAB && item.tabType !== undefined) ? item.tabType.toLowerCase() : item.name.toLowerCase();

  return (
    <Actionable key={item.id} onClick={(event:SyntheticMouseEvent<HTMLButtonElement>) => handleItemClick(event, item)}>
      <NavbarItemWrapper
        data-testid={'nav-' + item.name.replace(/ /g,'')}
        data-index={index}
        data-direct={item.isDirect}
        isCurrent={item.isCurrent}
      >
        { (item.hasActions || item.hasNewMessages) && <NavbarPip ref={ref} hasActions={item.hasActions} /> }
        { item.isDirect ? <DirectChatIcon isCurrent={item.isCurrent} name={item.otherUsersNames[0] || '?'} /> : t(nameKey) }
      </NavbarItemWrapper>
    </Actionable>
  );
});

const NavbarPip = React.forwardRef(({ hasActions = false }: {| hasActions?: boolean |}, ref) => (
  <PipStyle ref={ref}>
    <Pip hasActions={hasActions}/>
  </PipStyle>
));

NavbarItem.displayName = 'NavbarItem';

const MemoizedNavbarItem = React.memo < NavbarItemProps > (NavbarItem);

export default React.memo < NavbarProps > (Navbar);
