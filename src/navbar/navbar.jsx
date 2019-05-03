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
import { NavbarWrapper, NavbarItemsWrapper, NavbarItemsInnerWrapper, Underline, NavbarHamburgerWrapper, NavbarItemWrapper, Pip, PipStyle } from './styles';
import Actionable from '../components/Actionable';
import DirectChatIcon from './directChatIcon';
import { useTranslation } from 'react-i18next';

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
  const wrapper = useRef<?HTMLDivElement>();
  const selectedLink = useRef<?HTMLDivElement>();

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
    const { current:currentWrapper } = wrapper;

    if (currentLink && currentWrapper) {
      const marginWidth = 20;
      const { clientWidth:linkWidth } = currentLink;
      const { clientWidth:wrapperWidth } = currentWrapper;

      currentWrapper.scrollLeft = currentLink.offsetLeft > (wrapperWidth - linkWidth) ? currentLink.offsetLeft : 0;

      const updatedLeft = currentLink.offsetLeft + marginWidth;
      const updatedWidth = linkWidth - (marginWidth * 2);
      const updatedOpacity = (currentLink?.dataset?.direct === 'true') ? 0.0 : 1.0;

      const { left, width, opacity } = underlinePosition;
      if ((updatedLeft && updatedLeft !== left) || (updatedWidth && updatedWidth !== width) || updatedOpacity !== opacity ) {
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
      <NavbarItemsWrapper data-testid='navbarItems' ref={wrapper}>
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

const NavbarItem = React.forwardRef(({ item, index, handleItemClick }:NavbarItemProps, ref) => {
  const { t } = useTranslation();
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
        { item.isDirect ? <DirectChatIcon isCurrent={item.isCurrent} name={item.otherUsersNames[0] || '?'} /> : t(`channels.${item.name.toLowerCase()}`) }
      </NavbarItemWrapper>
    </Actionable>
  );
});

NavbarItem.displayName = 'NavbarItem';

const MemoizedNavbarItem = React.memo < NavbarItemProps > (NavbarItem);

export default React.memo < NavbarProps > (Navbar);
