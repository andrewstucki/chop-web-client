// @flow
/* global SyntheticMouseEvent */
import React, { useRef } from 'react';
import Actionable from '../components/Actionable';
import DirectChatIcon from './directChatIcon';
import TabOverflow from '../icons/tabOverflow';
import type { NavbarItemType } from './dux';
import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';
import { TAB, type TabTypeType } from '../pane/content/tab/dux';
import { PRIMARY_PANE } from '../pane/dux';
import { NavbarWrapper, NavbarItemWrapper, Pip, PipStyle, InvertedTabOverflowWrapper, TabOverflowWrapper } from './styles';
import { useTranslation } from 'react-i18next';
import { useScroll } from '../hooks';

type NavbarProps = {
  items: Array<NavbarItemType>,
  setPaneToEvent: (name: string, channelId: string) => void,
  setPaneToChat: (name: string, channelId: string) => void,
  setPaneToTab: (name: string, type: TabTypeType) => void,
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
  const selectedLink = useRef<?HTMLDivElement>();

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
          </InvertedTabOverflowWrapper>
        </Actionable>
      }
      {
        items.map((item, index) => (
          <MemoizedNavbarItem
            ref={item.isCurrent ? selectedLink : null}
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
          </TabOverflowWrapper>
        </Actionable>
      }
    </NavbarWrapper>
  );
};

const NavbarItem = React.forwardRef(({ item, index, handleItemClick }:NavbarItemProps, ref) => {
  const { t } = useTranslation();
  const nameKey = (item.type === TAB && item.tabType !== undefined) ? item.tabType.toLowerCase() : `channels.${item.name.toLowerCase()}`;
  return (
    <Actionable key={item.id} onClick={(event:SyntheticMouseEvent<HTMLButtonElement>) => handleItemClick(event, item)}>
      <NavbarItemWrapper
        ref={ref}
        data-testid={'nav-' + item.name.replace(/ /g,'')}
        data-index={index}
        data-direct={item.isDirect}
        isCurrent={item.isCurrent}
      >
        { (item.hasActions || item.hasNewMessages) && <PipStyle><Pip hasActions={item.hasActions}/></PipStyle> }
        { }
        { item.isDirect ? <DirectChatIcon isCurrent={item.isCurrent} name={item.otherUsersNames[0] || '?'} /> : t(nameKey) }
      </NavbarItemWrapper>
    </Actionable>
  );
});

NavbarItem.displayName = 'NavbarItem';

const MemoizedNavbarItem = React.memo < NavbarItemProps > (NavbarItem);

export default React.memo < NavbarProps > (Navbar);
