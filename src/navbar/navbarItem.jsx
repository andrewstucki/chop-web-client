// @flow
import React from 'react';
import NavbarPip from './navbarPip';
import DirectChatIcon from './directChatIcon';
import type { NavbarItemType } from './dux';
import { useTranslation } from 'react-i18next';
import { TAB } from '../pane/content/tab/dux';
import Actionable from '../components/Actionable';
import { NavbarItemWrapper } from './styles';

type NavbarItemProps = {
  item: NavbarItemType,
  index: number,
  handleItemClick: (event:SyntheticMouseEvent<HTMLButtonElement>, item: NavbarItemType) => void,
};

const NavbarItem = ({ item, index, handleItemClick }:NavbarItemProps, ref) => {
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
        { item.isDirect ? <DirectChatIcon isCurrent={item.isCurrent} nickname={item.otherSubscribersNames[0] || '?'} /> : t(nameKey) }
      </NavbarItemWrapper>
    </Actionable>
  );
};

export default React.forwardRef<NavbarItemProps, HTMLDivElement>(NavbarItem);
