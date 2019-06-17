// @flow
/* global SyntheticMouseEvent, SyntheticTouchEvent */
import React, {useCallback} from 'react';

import type {PrivateSubscriberType} from '../subscriber/dux';
import type {LanguageType} from '../feed/dux';

import LanguageSelector from '../languageSelector';
import TextModeToggle from '../textModeToggle';
import GuestExperienceLink from '../icons/guestExperienceLink';
import FeedbackLink from '../icons/feedbackLink';
import Exit from '../../assets/exit.svg';
import Avatar from '../avatar';
import ReactTouchEvents from 'react-touch-events';
import { ExternalLink, LinkIcon, OrganizationTitle, Nickname, EventDescription, EventTitle, Profile, ProfileActions, Menu, Overlay, LogOutButton, LinkWrapper, LoginWrapper, LoginButton, SignUpButton } from './styles';
import { admin } from '../subscriber/permissions';
import {usePermissions} from '../hooks/usePermissions';
import {privateSubscriberToSharedSubscriber} from '../subscriber/dux';
import { useTranslation } from 'react-i18next';

type SideMenuType = {
  logout: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  close: () => void,
  isClosed: boolean,
  onSwipe?: (event: SyntheticTouchEvent<HTMLButtonElement>) => void,
  setLanguage: (language: string) => void,
  login: () => void,
  languageOptions: Array<LanguageType>,
  organizationName: string,
  eventTitle: string,
  eventDescription: string,
  currentSubscriber: PrivateSubscriberType,
  currentLanguage: string,
  authenticated: boolean,
  host: boolean,
};

const SideMenu = (
  {
    logout,
    close,
    isClosed,
    onSwipe,
    languageOptions,
    setLanguage,
    organizationName,
    eventTitle,
    eventDescription,
    currentSubscriber,
    currentLanguage,
    authenticated,
    login,
    host,
  }: SideMenuType
) => {
  const { t } = useTranslation();
  const handleLogin = () => {
    close();
    login();
  };
  const hasAdminLinkPermissions = usePermissions(currentSubscriber, admin);
  return (
    <>
      <Overlay onClick={close} visible={!isClosed}/>
      <ReactTouchEvents onSwipe={onSwipe}>
        <Menu
          open={!isClosed}
          data-testid='side-menu'
          onTransitionEnd={useCallback(event => {
            if (event.target && isClosed) {
              event.target.scrollTop = 0;
            }
          }, [isClosed])}>
          <OrganizationTitle data-testid='organization-title'>{organizationName}</OrganizationTitle>
          <EventTitle data-testid='event-title'>{eventTitle}</EventTitle>
          <EventDescription data-testid='event-description'>{eventDescription}</EventDescription>

          { authenticated &&
            <Profile>
              <Avatar subscriber={privateSubscriberToSharedSubscriber(currentSubscriber)} large/>
              <Nickname>{currentSubscriber.nickname}</Nickname>
              <ProfileActions>
                <LogOutButton
                  data-testid='logout'
                  onClick={logout}>
                  <LinkIcon
                    dangerouslySetInnerHTML={{ __html: Exit }}
                  /> { t('log_out') }
                </LogOutButton>
              </ProfileActions>
            </Profile>
          }

          { !authenticated &&
            <LoginWrapper>
              <LoginButton onClick={handleLogin} data-testid="side-menu-login">Log In</LoginButton>
              <SignUpButton onClick={() => {}}>Sign Up</SignUpButton>
            </LoginWrapper>
          }

          <div css={`margin-top: auto;`}>
            <LanguageSelector
              setLanguage={setLanguage}
              languageOptions={languageOptions}
              currentLanguage={currentLanguage}
            />
          </div>

          <TextModeToggle />

          { host &&
            <>
              <hr/>

              <LinkWrapper>
                <ExternalLink
                  data-testid="guest-experience"
                  href={`${window.location.origin.toString()}/guest_experience`}
                >
                  { t('guest_experience') }
                  <LinkIcon size={16}>
                    <GuestExperienceLink/>
                  </LinkIcon>
                </ExternalLink>
    
                { hasAdminLinkPermissions &&
                <ExternalLink
                  data-testid="admin-link"
                  href={`${window.location.origin.toString()}/admin`}
                >
                  { t('admin') }
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
                  { t('support') }
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
                  { t('give_feedback') }
                  <LinkIcon size={14}>
                    <FeedbackLink/>
                  </LinkIcon>
                </ExternalLink>
              </LinkWrapper>
            </>
          }

        </Menu>
      </ReactTouchEvents>
    </>
  );
};

export default React.memo < SideMenuType > (SideMenu);
