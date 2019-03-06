import React from 'react';
import { Wrapper, IconButton, NavMenuButton, NavMenuHeader, NavMenuBody, NavMenuBodySection, NavMenuFooter, NavMenuIconWrapper, NavMenuTextWrapper, NavMenuChurchName, InnerWrapper, Label, getColor } from './styles';
import Hamburger from '../icons/hamburger';
import HostChat from '../icons/host-chat';
import HostInfo from '../icons/host-info';
import Chat from '../icons/chat';
import Calendar from '../icons/calendar';
import Bible from '../icons/bible';
import Document from '../icons/document';
import LeftArrow from '../icons/left-arrow';
import RightArrow from '../icons/right-arrow';
import Actionable from '../components/Actionable';
import { theme } from '../styles';
import {PRIMARY_PANE} from '../pane/dux';
import {HOST_INFO} from '../hostInfo/dux';
import {getFirstInitial} from '../util';
import {DirectChatAvatar} from '../components/styles';

const NavMenuItem = ({Icon, useAvatar, text, selected = false, onClick = null, expanded, disabled = false}) => (
  <Actionable onClick={onClick}>
    <NavMenuButton disabled={disabled} expanded={expanded}>
      <NavMenuIconWrapper>
        { useAvatar &&
          <DirectChatAvatar isCurrent={selected} name={text}>
            {getFirstInitial(text)}
          </DirectChatAvatar>
        }
        { !useAvatar &&
          <Icon large={!expanded} color={getColor(theme.colors, disabled, selected)} />
        }
      </NavMenuIconWrapper>
      {expanded &&
        <NavMenuTextWrapper selected={selected} disabled={disabled}>
          {text}
          { disabled &&
            <Label>Coming Soon</Label>
          }
        </NavMenuTextWrapper>
      }
    </NavMenuButton>
  </Actionable>
);

const NavMenuHamburger = ({onClick, expanded}) => (
  <Actionable onClick={onClick}>
    <IconButton expanded={expanded}>
      <Hamburger large={!expanded} />
    </IconButton>
  </Actionable>
);

const NavMenuMinifyArrow = ({onClick, expanded}) => (
  <Actionable onClick={onClick}>
    <IconButton expanded={expanded}>
      { expanded &&
        <LeftArrow color={theme.colors.gray50} />
      }
      { !expanded &&
        <RightArrow color={theme.colors.gray50} />
      }
    </IconButton>
  </Actionable>
);

const NavMenu = ({organizationName, setPaneToEvent, publicChannel, setPaneToChat, hostChannel, setPaneToTab, directChannels, openMenu, expanded, toggleExpanded, currentTabType}) => (
  <Wrapper expanded={expanded}>
    <InnerWrapper expanded={expanded}>
      <NavMenuHeader>
        <NavMenuIconWrapper>
          <NavMenuHamburger onClick={openMenu} expanded={expanded} />
        </NavMenuIconWrapper>
        {expanded &&
          <NavMenuChurchName>
            {organizationName}
          </NavMenuChurchName>
        }
      </NavMenuHeader>
      <NavMenuBody>
        { directChannels.length > 0 &&
        <NavMenuBodySection>
          { directChannels.map(channel =>
            <NavMenuItem key={channel.id} useAvatar={true} text={channel.otherUsersNames[0]} expanded={expanded}
              selected={channel.isCurrent} onClick={() => setPaneToChat(PRIMARY_PANE, channel.id)}/>
          )}
        </NavMenuBodySection>
        }
        <NavMenuBodySection>
          <NavMenuItem Icon={Chat} text="Chat" expanded={expanded} selected={publicChannel.isCurrent} onClick={() => setPaneToEvent(PRIMARY_PANE, publicChannel.id)} />
          <NavMenuItem Icon={HostChat} text="Host Chat" expanded={expanded} selected={hostChannel.isCurrent} onClick={() => setPaneToChat(PRIMARY_PANE, hostChannel.id)} />
          <NavMenuItem Icon={HostInfo} text="Host Info" expanded={expanded} selected={currentTabType === 'HOST_INFO'} onClick={() => setPaneToTab(PRIMARY_PANE, HOST_INFO)} />
          <NavMenuItem Icon={Calendar} text="Schedule" expanded={expanded} disabled={true} />
          <NavMenuItem Icon={Document} text="Notes" expanded={expanded} disabled={true} />
          <NavMenuItem Icon={Bible} text="Bible" expanded={expanded} disabled={true} />
        </NavMenuBodySection>
      </NavMenuBody>
      <NavMenuFooter data-testid="nav-menu-footer">
        <NavMenuIconWrapper>
          <NavMenuMinifyArrow onClick={toggleExpanded} expanded={expanded} />
        </NavMenuIconWrapper>
      </NavMenuFooter>
    </InnerWrapper>
  </Wrapper>
);

export default NavMenu;
