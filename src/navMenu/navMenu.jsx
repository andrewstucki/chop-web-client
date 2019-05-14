import React from 'react';
import {
  Wrapper,
  IconButton,
  NavMenuButton,
  NavMenuHeader,
  NavMenuBody,
  NavMenuBodySection,
  NavMenuFooter,
  NavMenuIconWrapper,
  NavMenuTextWrapper,
  NavMenuCapTextWrapper,
  NavMenuChurchName,
  InnerWrapper,
  Label,
  getColor,
  PipWrapper,
  PipWrapperCollapsed, 
} from './styles';
import Hamburger from '../icons/hamburger';
import HostChat from '../icons/hostChat';
import HostInfo from '../icons/hostInfo';
import Chat from '../icons/chat';
import Calendar from '../icons/calendar';
import Bible from '../icons/bible';
import Document from '../icons/document';
import LeftArrow from '../icons/leftArrow';
import RightArrow from '../icons/rightArrow';
import Actionable from '../components/Actionable';
import { theme } from '../styles';
import {PRIMARY_PANE} from '../pane/dux';
import {HOST_INFO} from '../hostInfo/dux';
import {getFirstInitial} from '../util';
import {MediumDown, LargeDown} from '../util/responsive';
import {DirectChatAvatar} from '../components/styles';
import Pip from '../components/pip';
import { useTranslation } from 'react-i18next';

const NavMenuItem = React.memo(({Icon, useAvatar, text, selected = false, onClick = null, expanded, disabled = false, hasActions, hasNewMessages}) => {
  const { t } = useTranslation();
  return (
    <Actionable onClick={onClick}>
      <NavMenuButton disabled={disabled} expanded={expanded}>
        <NavMenuIconWrapper expanded={expanded}>
          { useAvatar &&
          <DirectChatAvatar isCurrent={selected} name={text}>
            {getFirstInitial(text)}
          </DirectChatAvatar>
          }
          { !useAvatar &&
          <Icon large={!expanded} color={getColor(theme.colors, disabled, selected)} />
          }
        </NavMenuIconWrapper>
        {expanded && useAvatar &&
          <NavMenuTextWrapper selected={selected} disabled={disabled}>
            {text}
          </NavMenuTextWrapper>
        }
        {expanded &&  !useAvatar &&
        <NavMenuCapTextWrapper selected={selected} disabled={disabled}>
          {text}
          { disabled &&
            <Label>{t('coming_soon')}</Label>
          }
        </NavMenuCapTextWrapper>
        }
        { expanded ?
          (hasActions || hasNewMessages) && <PipWrapper><Pip hasActions={hasActions} theme={theme}/></PipWrapper> :
          (hasActions || hasNewMessages) && <PipWrapperCollapsed><Pip hasActions={hasActions} theme={theme}/></PipWrapperCollapsed>
        }
      </NavMenuButton>
    </Actionable>
  );
});
NavMenuItem.displayName = 'NavMenuItem';

const NavMenuHamburger = React.memo(({onClick, expanded}) => (
  <Actionable onClick={onClick}>
    <IconButton>
      <Hamburger large={!expanded} />
    </IconButton>
  </Actionable>
));
NavMenuHamburger.displayName = 'NavMenuHamburger';

const NavMenuMinifyArrow = React.memo(({onClick, expanded}) => (
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
));

NavMenuMinifyArrow.displayName = 'NavMenuMinifyArrow';

const NavMenu = ({organizationName, setPaneToEvent, publicChannel, setPaneToChat, hostChannel, setPaneToTab, directChannels, openMenu, expanded, toggleExpanded, currentTabType}) => {
  const { t } = useTranslation();
  return (
    <Wrapper expanded={expanded}>
      <InnerWrapper expanded={expanded}>
        <NavMenuHeader>
          <NavMenuIconWrapper expanded={expanded}>
            <NavMenuHamburger onClick={openMenu} expanded={expanded}/>
          </NavMenuIconWrapper>
          {expanded &&
          <NavMenuChurchName>
            {organizationName}
          </NavMenuChurchName>
          }
        </NavMenuHeader>
        <NavMenuBody>
          {directChannels.length > 0 &&
          <NavMenuBodySection>
            {directChannels.map(channel =>
              <NavMenuItem key={channel.id} useAvatar={true} text={channel.otherUsersNames[0] || '?'}
                expanded={expanded} hasActions={channel.hasActions} hasNewMessages={channel.hasNewMessages}
                selected={channel.isCurrent}
                onClick={() => setPaneToChat(PRIMARY_PANE, channel.id, channel.isPlaceholder || false,)}/>
            )}
          </NavMenuBodySection>
          }
          <NavMenuBodySection>
            <MediumDown>
              <NavMenuItem Icon={Chat} text={t('chat')} expanded={expanded} selected={publicChannel.isCurrent}
                hasActions={publicChannel.hasActions} hasNewMessages={publicChannel.hasNewMessages}
                onClick={() => setPaneToEvent(PRIMARY_PANE, publicChannel.id)}/>
            </MediumDown>
            <LargeDown>
              <NavMenuItem Icon={HostChat} text={t('host_chat')} expanded={expanded} selected={hostChannel.isCurrent}
                hasActions={hostChannel.hasActions} hasNewMessages={hostChannel.hasNewMessages}
                onClick={() => setPaneToChat(PRIMARY_PANE, hostChannel.id)}/>
            </LargeDown>
            <NavMenuItem Icon={HostInfo} text={t('host_info')} expanded={expanded} selected={currentTabType === 'HOST_INFO'}
              onClick={() => setPaneToTab(PRIMARY_PANE, HOST_INFO)}/>
            <NavMenuItem Icon={Calendar} text={t('schedule')} expanded={expanded} disabled={true}/>
            <NavMenuItem Icon={Document} text={t('notes')} expanded={expanded} disabled={true}/>
            <NavMenuItem Icon={Bible} text={t('bible')} expanded={expanded} disabled={true}/>
          </NavMenuBodySection>
        </NavMenuBody>
        <NavMenuFooter data-testid="nav-menu-footer">
          <NavMenuIconWrapper>
            <NavMenuMinifyArrow onClick={toggleExpanded} expanded={expanded}/>
          </NavMenuIconWrapper>
        </NavMenuFooter>
      </InnerWrapper>
    </Wrapper>
  );
};

export default React.memo(NavMenu);
