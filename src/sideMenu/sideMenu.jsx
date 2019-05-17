// @flow
/* global SyntheticMouseEvent, SyntheticTouchEvent */
import React, {useCallback} from 'react';
import LanguageSelector from '../languageSelector';
import TextModeToggle from '../textModeToggle';
import GuestExperienceLink from '../icons/guestExperienceLink';
import FeedbackLink from '../icons/feedbackLink';
import Exit from '../../assets/exit.svg';
import Avatar from '../avatar';
import ReactTouchEvents from 'react-touch-events';
import type { LanguageType } from '../feed/dux';
import { ExternalLink, LinkIcon, OrganizationTitle, Nickname, EventDescription, EventTitle, Profile, ProfileActions, Menu, Overlay, LogOutButton, LinkWrapper } from './styles';
import { admin } from '../users/permissions';
import { usePermissions } from '../hooks/usePermissions';
import { privateUserToSharedUser, type PrivateUserType } from '../users/dux';
import { useTranslation } from 'react-i18next';

type SideMenuType = {
  logout: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  close: () => void,
  isClosed: boolean,
  onSwipe?: (event: SyntheticTouchEvent<HTMLButtonElement>) => void,
  setLanguage: (language: string) => void,
  languageOptions: Array<LanguageType>,
  organizationName: string,
  eventTitle: string,
  eventDescription: string,
  currentUser: PrivateUserType,
  currentLanguage: string,
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
    currentUser,
    currentLanguage,
  }: SideMenuType
) => {
  const { t } = useTranslation();
  const hasAdminLinkPermissions = usePermissions(currentUser, admin);
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

          <Profile>
            <Avatar user={privateUserToSharedUser(currentUser)} large/>
            <Nickname>{currentUser.name}</Nickname>
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

          <LanguageSelector
            setLanguage={setLanguage}
            languageOptions={languageOptions}
            currentLanguage={currentLanguage}
          />

          <TextModeToggle />

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

        </Menu>
      </ReactTouchEvents>
    </>
  );
};

export default React.memo < SideMenuType > (SideMenu);
