// @flow
/* global SyntheticMouseEvent */
import React, { useState, useEffect, useRef } from 'react';
import type { NavbarItemType } from './dux';
import Hamburger from '../icons/hamburger';
import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';
import type { TabTypeType } from '../pane/content/tab/dux';
import { TAB} from '../pane/content/tab/dux';
import { PRIMARY_PANE } from '../pane/dux';
import { NavbarWrapper, NavbarItemsWrapper, NavbarItemsInnerWrapper, Underline, NavbarHamburgerWrapper, NavbarItemWrapper, Pip } from './styles';
import Actionable from '../components/Actionable';
import DirectChatIcon from './directChatIcon';

type NavbarProps = {
  items: Array<NavbarItemType>,
  openMenu: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  setPaneToEvent: (name: string, channelId: string) => void,
  setPaneToChat: (name: string, channelId: string) => void,
  setPaneToTab: (name: string, type: TabTypeType) => void,
  setNavbarIndex: (index: number) => void,
  navbarIndex: number,
};

type NavbarState = {
  left: number,
  width: number,
  opacity: number,
};

type NavbarItemProps = {
  item: NavbarItemType,
  index: number,
  handleItemClick: (event:SyntheticMouseEvent<HTMLButtonElement>, item: NavbarItemType) => void,
};

const Navbar = ( { items = [], openMenu, setPaneToEvent, setPaneToChat, setPaneToTab, setNavbarIndex, navbarIndex }: NavbarProps) => {
  const selectedLink = useRef(null);
  const [ underlinePosition, setUnderlinePosition ] = useState < NavbarState > ({
    left: 20,
    width: 42,
    opacity: 1.0,
  });

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

  useEffect(() => {
    const { current:currentLink } = selectedLink;
    if (currentLink && typeof currentLink.getBoundingClientRect === 'function') {
      const marginWidth = 20;
      const { width:linkWidth } = currentLink.getBoundingClientRect();

      currentLink.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'end' });

      const updatedLeft = currentLink.offsetLeft + marginWidth;
      const updatedWidth = linkWidth - (marginWidth * 2);
      const updatedOpacity = (currentLink.getAttribute('data-direct') === 'true') ? 0.0 : 1.0;

      const { left, width, opacity } = underlinePosition;
      if (updatedLeft !== left || updatedWidth !== width || updatedOpacity !== opacity ) {
        setUnderlinePosition({
          left: updatedLeft,
          width: updatedWidth,
          opacity: updatedOpacity,
        });
      }
    }
  });

  return (
    <NavbarWrapper data-testid='navbar'>
      <Actionable onClick={openMenu}>
        <NavbarHamburgerWrapper>
          <Hamburger size={32}/>
        </NavbarHamburgerWrapper>
      </Actionable>
      <NavbarItemsWrapper data-testid='navbarItems'>
        <NavbarItemsInnerWrapper>
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
          {
            <Underline
              left={underlinePosition.left}
              width={underlinePosition.width}
              opacity={underlinePosition.opacity}
            />
          }
        </NavbarItemsInnerWrapper>
      </NavbarItemsWrapper>
    </NavbarWrapper>
  );
};

const NavbarItem = React.forwardRef(({ item, index, handleItemClick }:NavbarItemProps, ref) => (
  <Actionable key={item.id} onClick={(event:SyntheticMouseEvent<HTMLButtonElement>) => handleItemClick(event, item)}>
    <NavbarItemWrapper
      ref={ref}
      data-testid={'nav-' + item.name.replace(/ /g,'')}
      data-index={index}
      data-direct={item.isDirect}
      isCurrent={item.isCurrent}
    >
      { item.hasActions && <Pip /> }
      { }
      { item.isDirect ? <DirectChatIcon isCurrent={item.isCurrent} name={item.otherUsersNames[0] || '?'} /> : item.name }
    </NavbarItemWrapper>
  </Actionable>
));

NavbarItem.displayName = 'NavbarItem';

const MemoizedNavbarItem = React.memo < NavbarItemProps > (NavbarItem);

export default React.memo < NavbarProps > (Navbar);
