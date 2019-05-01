// @flow
/* global SyntheticMouseEvent, SyntheticTouchEvent */
import React, {useCallback} from 'react';

import type {PrivateUserType} from '../users/dux';
import type {LanguageType} from '../feed/dux';

import SideMenuItem from './sideMenuItem';
import LanguageSelector from '../languageSelector';
import GuestExperienceLink from '../icons/guestExperienceLink';
import FeedbackLink from '../icons/feedbackLink';
import PublicChat from '../../assets/public-chat.svg';
import HostChat from '../../assets/host-chat.svg';
import HostInfo from '../../assets/host-info.svg';
import Calendar from '../../assets/calendar.svg';
import Document from '../../assets/document.svg';
import Bible from '../../assets/bible.svg';
import Exit from '../../assets/exit.svg';
import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';

import { ExternalLink, LinkIcon, OrganizationTitle, Nickname, EventDescription, EventTitle, Profile, ProfileActions, Menu, Overlay, LogOutButton } from './styles';
import type { PaneType } from '../pane/dux';
import { PRIMARY_PANE } from '../pane/dux';
import { HOST_INFO } from '../hostInfo/dux';
import type {TabTypeType} from '../pane/content/tab/dux';
import Avatar from '../avatar';
import MediaQuery from 'react-responsive';
import ReactTouchEvents from 'react-touch-events';
import { admin } from '../users/permissions';
import {usePermissions} from '../hooks/usePermissions';
import {privateUserToSharedUser} from '../users/dux';

type SideMenuType = {
  logout: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  close: () => void,
  isClosed: boolean,
  onSwipe?: (event: SyntheticTouchEvent<HTMLButtonElement>) => void,
  setLanguage: (language: string) => void,
  languageOptions: Array<LanguageType>,
  publicChannel: string,
  hostChannel: string,
  currentPane: PaneType,
  setPaneToEvent: (name: string, channelId: string) => void,
  setPaneToChat: (name: string, channelId: string) => void,
  setPaneToTab: (name: string, type: TabTypeType) => void,
  addTab: (type: TabTypeType, id: string,  name: string) => void,
  organizationName: string,
  eventTitle: string,
  eventDescription: string,
  currentUser: PrivateUserType,
};

const SideMenu = (
  {
    logout,
    close,
    isClosed,
    onSwipe,
    languageOptions,
    setLanguage,
    publicChannel,
    hostChannel,
    currentPane,
    setPaneToEvent,
    setPaneToChat,
    setPaneToTab,
    addTab,
    organizationName,
    eventTitle,
    eventDescription,
    currentUser,
  }: SideMenuType
) => {
  const hasAdminLinkPermissions = usePermissions(currentUser, admin);
  return (
    <>
    <Overlay onClick={close} visible={!isClosed}/>
    <ReactTouchEvents onSwipe={onSwipe}>
      <Menu
        open={!isClosed}
        onTransitionEnd={useCallback(event => {
          if (event.target && isClosed) {
            event.target.scrollTop = 0;
          }
        }, [isClosed])}>
        <OrganizationTitle>{organizationName}</OrganizationTitle>
        <EventTitle>{eventTitle}</EventTitle>
        <EventDescription>{eventDescription}</EventDescription>

        <Profile>
          <Avatar user={privateUserToSharedUser(currentUser)} large/>
          <Nickname>{currentUser.name}</Nickname>
          <ProfileActions>
            <LogOutButton
              data-testid='logout'
              onClick={logout}>
              <LinkIcon
                dangerouslySetInnerHTML={{__html: Exit}}
              /> Log Out
            </LogOutButton>
          </ProfileActions>
        </Profile>

        <MediaQuery maxWidth={639}>

          <SideMenuItem
            active={currentPane.type === EVENT}
            icon={PublicChat}
            title='public chat'
            onClick={() => setPaneToEvent(PRIMARY_PANE, publicChannel) && close()}
          />

          <SideMenuItem
            // $FlowFixMe
            active={currentPane.type === CHAT && currentPane.content.channelId === hostChannel}
            icon={HostChat}
            title='host chat'
            onClick={() => setPaneToChat(PRIMARY_PANE, hostChannel) && close()}
          />

          <SideMenuItem
            active={false}
            icon={HostInfo}
            title='host info'
            onClick={() => addTab(HOST_INFO, 'hostInfo', 'Host Info') && setPaneToTab(PRIMARY_PANE, HOST_INFO) && close()}
          />

          <SideMenuItem
            active={false}
            icon={Calendar}
            title='schedule'
            onClick={(event: SyntheticMouseEvent<HTMLDivElement>) => event.preventDefault()}
            comingSoon
          />

          <SideMenuItem
            active={false}
            icon={Document}
            title='notes'
            onClick={(event: SyntheticMouseEvent<HTMLDivElement>) => event.preventDefault()}
            comingSoon
          />

          <SideMenuItem
            active={false}
            icon={Bible}
            title='bible'
            onClick={(event: SyntheticMouseEvent<HTMLDivElement>) => event.preventDefault()}
            comingSoon
          />

          <hr/>

        </MediaQuery>

        <LanguageSelector
          setLanguage={setLanguage}
          languageOptions={languageOptions}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ExternalLink
            data-testid="guest-experience"
            href={`${window.location.origin.toString()}/guest_experience`}
          >
            Guest experience
            <LinkIcon size={16}>
              <GuestExperienceLink/>
            </LinkIcon>
          </ExternalLink>

          { hasAdminLinkPermissions &&
            <ExternalLink
              data-testid="admin-link"
              href={`${window.location.origin.toString()}/admin`}
            >
              Admin
              <LinkIcon size={14}>
                <FeedbackLink/>
              </LinkIcon>
            </ExternalLink>
          }

          <ExternalLink
            data-testid="support"
            target="_blank"
            rel="noopener noreferrer"
            href="https://support.churchonlineplatform.com/en/category/host-mobile-hn92o9"
          >
            Support
            <LinkIcon size={14}>
              <FeedbackLink/>
            </LinkIcon>
          </ExternalLink>

          <ExternalLink
            data-testid="feedback"
            target="_blank"
            rel="noopener noreferrer"
            href="https://lifechurch.formstack.com/forms/host_feedback_2"
          >
            Give feedback
            <LinkIcon size={14}>
              <FeedbackLink/>
            </LinkIcon>
          </ExternalLink>
        </div>

      </Menu>
    </ReactTouchEvents>
  </>
  );
};

export default React.memo < SideMenuType > (SideMenu);
