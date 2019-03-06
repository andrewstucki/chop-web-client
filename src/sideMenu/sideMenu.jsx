// @flow
/* global SyntheticMouseEvent, SyntheticTouchEvent */
import React from 'react';

import type {LanguageType, SharedUserType} from '../feed/dux';

import SideMenuComponent from '../components/sideMenu';
import SideMenuItem from './sideMenuItem';
import LanguageSelector from '../languageSelector';
import GuestExperienceLink from '../../assets/guest-experience-link.svg';
import FeedbackLink from '../../assets/feedback-link.svg';
import PublicChat from '../../assets/public-chat.svg';
import HostChat from '../../assets/host-chat.svg';
import HostInfo from '../../assets/host-info.svg';
import Calendar from '../../assets/calendar.svg';
import Document from '../../assets/document.svg';
import Bible from '../../assets/bible.svg';
import Exit from '../../assets/exit.svg';
import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';

import { ExternalLink, LinkIcon, OrganizationTitle, Nickname, EventDescription, EventTitle, Profile, ProfileActions } from './styles';
import type { PaneType } from '../pane/dux';
import { PRIMARY_PANE } from '../pane/dux';
import { HOST_INFO } from '../hostInfo/dux';
import type {TabTypeType} from '../pane/content/tab/dux';
import Avatar from '../avatar';

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
  currentUser: SharedUserType,
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
) => (
  <SideMenuComponent
    close={close}
    isClosed={isClosed}
    swipe={onSwipe}
  >
    <OrganizationTitle>{organizationName}</OrganizationTitle>
    <EventTitle>{eventTitle}</EventTitle>
    <EventDescription>{eventDescription}</EventDescription>

    <Profile>
      <Avatar user={currentUser} large/>
      <Nickname>{currentUser.name}</Nickname>
      <ProfileActions>
        <a
          id='logout'
          href="javascript:void(0)"
          onClick={logout}>
          <LinkIcon
            dangerouslySetInnerHTML={{ __html: Exit }}
          /> Log Out
        </a>
      </ProfileActions>
    </Profile>

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
      onClick={() => addTab(HOST_INFO, 'hostInfo', 'Host Info' ) && setPaneToTab(PRIMARY_PANE, HOST_INFO) && close()}
    />

    <SideMenuItem
      active={false}
      icon={Calendar}
      title='schedule'
      onClick={(event:SyntheticMouseEvent<HTMLDivElement>) => event.preventDefault()}
      comingSoon
    />

    <SideMenuItem
      active={false}
      icon={Document}
      title='notes'
      onClick={(event:SyntheticMouseEvent<HTMLDivElement>) => event.preventDefault()}
      comingSoon
    />

    <SideMenuItem
      active={false}
      icon={Bible}
      title='bible'
      onClick={(event:SyntheticMouseEvent<HTMLDivElement>) => event.preventDefault()}
      comingSoon
    />

    <hr />

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
        href={`${window.location.origin.toString()}/guest_experience`}
        data-testid="guest-experience"
      >
        Guest experience
        <LinkIcon
          dangerouslySetInnerHTML={{ __html: GuestExperienceLink }}
          withStroke
        />
      </ExternalLink>

      <ExternalLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://support.churchonlineplatform.com/en/category/host-mobile-hn92o9"
        data-testid="support"
      >
        Support
        <LinkIcon
          dangerouslySetInnerHTML={{ __html: FeedbackLink }}
          withStroke
        />
      </ExternalLink>

      <ExternalLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://lifechurch.formstack.com/forms/host_feedback_2"
        data-testid="feedback"
      >
        Give feedback
        <LinkIcon
          dangerouslySetInnerHTML={{ __html: FeedbackLink }}
          withStroke
        />
      </ExternalLink>
    </div>
  </SideMenuComponent>
);

export default React.memo < SideMenuType > (SideMenu);
