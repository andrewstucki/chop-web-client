// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import type { Node } from 'react';
import type { NavbarItemType } from './dux';
import styles from './styles.css';
import Hamburger from '../icons/hamburger';
import { getFirstInitial } from '../util';
import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';
import type { TabTypeType } from '../pane/content/tab/dux';
import {TAB} from '../pane/content/tab/dux';
import {PRIMARY_PANE} from '../pane/dux';
import { NavBarItemWrapper, Pip, DirectChatAvatar, Underline, NavBarHamburgerWrapper } from './styles';
import Actionable from '../components/Actionable';

type NavBarProps = {
  items: Array<NavbarItemType>,
  openMenu: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  setPaneToEvent: (name: string, channelId: string) => void,
  setPaneToChat: (name: string, channelId: string) => void,
  setPaneToTab: (name: string, type: TabTypeType) => void,
  setNavbarIndex: (index: number) => void,
  navbarIndex: number,
};

type NavBarState = {
  left: number,
  width: number,
  opacity: number,
  directChatChannelNames: {
    [string]: string,
  },
};

const NavBarItem = ({item, directChatChannelNames}) => {
  if (item.isDirect) {
    const channelIconName = directChatChannelNames[item.id] || '?';
    return (
      <DirectChatAvatar isCurrent={item.isCurrent} name={channelIconName}>
        {getFirstInitial(channelIconName)}
      </DirectChatAvatar>
    );
  } else {
    return item.name;
  }
};

class NavBar extends React.Component<NavBarProps, NavBarState> {
  selectedLink: { current: any };
  itemLink: (channel: NavbarItemType) => Node;
  itemTab: (channel: NavbarItemType, index:number) => Node;

  constructor (props: NavBarProps) {
    super(props);
    this.selectedLink = React.createRef();
    this.state = {
      left: 20,
      width: 42,
      opacity: 1.0,
      directChatChannelNames: {},
    };
  }

  static getDerivedStateFromProps (
    props: NavBarProps,
    state: NavBarState
  ): NavBarState | null {
    let copyOfNames = { ...state.directChatChannelNames };
    let hasUpdated = false;
    const { items } = props;

    items.filter(item => item.isDirect).forEach(item => {
      if (item.otherUsersNames.length > 0 &&
        state.directChatChannelNames[item.id] !== item.otherUsersNames[0]
      ) {
        hasUpdated = true;
        copyOfNames = {
          ...copyOfNames,
          [item.id]: item.otherUsersNames[0],
        };
      }
    });

    if (hasUpdated) {
      return {
        ...state,
        directChatChannelNames: copyOfNames,
      };
    } else {
      return null;
    }
  }

  componentDidUpdate () {
    if (this.selectedLink && this.selectedLink.current) {
      const marginWidth = 20;
      const selectedLink = this.selectedLink.current;
      const {
        width,
      } = selectedLink.getBoundingClientRect();

      selectedLink.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'end' });

      const updatedLeft = selectedLink.offsetLeft + marginWidth;
      const updatedWidth = width - (marginWidth * 2);
      const updatedOpacity = (selectedLink && selectedLink.getAttribute('data-direct') === 'true') ? 0.0 : 1.0;
      const { navbarIndex, setNavbarIndex } = this.props;
      const { index } = selectedLink.dataset;

      if (this.shouldUpdateState(updatedLeft, updatedWidth, updatedOpacity)) {
        this.setState(
          {
            left: updatedLeft,
            width: updatedWidth,
            opacity: updatedOpacity,
          }
        );

        if (navbarIndex.toString() !== index) {
          setNavbarIndex(parseInt(index));
        }
      }
    }
  }

  shouldUpdateState (
    updatedLeft: number,
    updatedWidth: number,
    updatedOpacity: number) {
    return this.state.left !== updatedLeft ||
      this.state.width !== updatedWidth ||
      this.state.opacity !== updatedOpacity;
  }

  itemTab = (item: NavbarItemType, index: number) => {
    const selectedLink = item.isCurrent ? this.selectedLink : null;
    return (
      <Actionable key={item.id} onClick={() => this.handleTabClick(item)}>
        <NavBarItemWrapper
          ref={selectedLink}
          id={'nav-' + item.name.replace(/ /g,'')}
          data-index={index}
          data-direct={item.isDirect}
          isCurrent={item.isCurrent}
        >
          { item.hasActions
            ? <Pip />
            : null }
          <NavBarItem item={item} directChatChannelNames={this.state.directChatChannelNames} />
        </NavBarItemWrapper>
      </Actionable>
    );
  };

  handleTabClick = (item: NavbarItemType):void => {
    const { setPaneToEvent, setPaneToChat, setPaneToTab } = this.props;
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

  render () {
    const {
      items,
      openMenu,
    } = this.props;

    return (
      <div id="nav-bar" className={styles.navBar}>
        <Actionable onClick={openMenu}>
          <NavBarHamburgerWrapper>
            <Hamburger size={32} />
          </NavBarHamburgerWrapper>
        </Actionable>
        <div className={styles.channelLinks}>
          <div className={styles.channelLinksWrapper}>
            {
              items.map((item, index) => (
                this.itemTab(item, index)
              ))
            }
            {
              <Underline
                left={this.state.left}
                width={this.state.width}
                opacity={this.state.opacity}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
