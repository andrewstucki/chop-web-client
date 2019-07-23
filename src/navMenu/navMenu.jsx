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
import {MediumDown, LargeDown, MediumUp} from '../util/responsive';
import DirectChatIcon from '../navbar/directChatIcon';
import Pip from '../components/pip';
import { useTranslation } from 'react-i18next';
import { SCHEDULE } from '../schedule/dux';
import { EVENT_NOTES } from '../eventNotes/dux';

const NavMenuItem = React.memo(({Icon, direct = false, text, selected = false, onClick = null, expanded, disabled = false, hasActions, hasNewMessages}) => {
  const { t } = useTranslation();
  return (
    <Actionable onClick={onClick}>
      <NavMenuButton disabled={disabled} expanded={expanded}>
        <NavMenuIconWrapper expanded={expanded}>
          { direct ?
            <DirectChatIcon isCurrent={selected} nickname={text}/> :
            <Icon large={!expanded} color={getColor(theme.colors, disabled, selected)} />
          }
        </NavMenuIconWrapper>
        { expanded &&
          <NavMenuTextWrapper selected={selected} disabled={disabled} cap={!direct} >
            {text}
            { disabled &&
              <Label>{t('coming_soon')}</Label>
            }
          </NavMenuTextWrapper>
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

const NavMenu = ({organizationName, setPaneToEvent, publicChannel, setPaneToChat, hostChannel, setPaneToTab, directChannels, openMenu, expanded, toggleExpanded, currentTabType, isHost}) => {
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
              <NavMenuItem key={channel.id} direct={true} expanded={expanded} selected={channel.isCurrent} text={channel.otherSubscribersNames[0] || channel.name}
                hasActions={channel.hasActions} hasNewMessages={channel.hasNewMessages}
                onClick={() => setPaneToChat(PRIMARY_PANE, channel.id, channel.isPlaceholder || false,)}/>
            )}
          </NavMenuBodySection>
          }
          <NavMenuBodySection>
            { !isHost &&
              <MediumUp>
                <NavMenuItem Icon={Chat} text={t('chat')} expanded={expanded} selected={publicChannel.isCurrent}
                  hasActions={publicChannel.hasActions} hasNewMessages={publicChannel.hasNewMessages}
                  onClick={() => setPaneToEvent(PRIMARY_PANE, publicChannel.id)}/>
              </MediumUp>
            }
            { isHost &&
              <>
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
                <NavMenuItem Icon={HostInfo} text={t('host_info')} expanded={expanded} selected={currentTabType === HOST_INFO}
                  onClick={() => setPaneToTab(PRIMARY_PANE, HOST_INFO)}/>
              </>
            }
            <NavMenuItem Icon={Calendar} text={t('schedule')} expanded={expanded} selected={currentTabType === SCHEDULE}
              onClick={() => setPaneToTab(PRIMARY_PANE, SCHEDULE)}/>
            <NavMenuItem Icon={Document} text={t('event_notes')} expanded={expanded} selected={currentTabType === EVENT_NOTES}
              onClick={() => setPaneToTab(PRIMARY_PANE, EVENT_NOTES)}/>
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

export default NavMenu;
