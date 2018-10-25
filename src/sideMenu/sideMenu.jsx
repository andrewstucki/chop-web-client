// @flow
/* global SyntheticMouseEvent, SyntheticTouchEvent */
import React from 'react';

import type { LanguageType } from '../feed/dux';

import SideMenuComponent from '../components/sideMenu';
import Button from '../components/button';
import LanguageSelector from '../languageSelector';
import GuestExperienceLink from '../../assets/guest-experience-link.svg';
import FeedbackLink from '../../assets/feedback-link.svg';

import styles from './styles.css';

type SideMenuType = {
  logout: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  close: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  isClosed: boolean,
  onSwipe?: (event: SyntheticTouchEvent<HTMLButtonElement>) => void,
  setLanguage: (language: string) => void,
  languageOptions: Array<LanguageType>,
};

const SideMenu = (
  {
    logout,
    close,
    isClosed,
    onSwipe,
    languageOptions,
    setLanguage,
  }: SideMenuType
) => (
  <SideMenuComponent
    close={close}
    isClosed={isClosed}
    swipe={onSwipe}
  >
    <a
      id="feedback"
      className={styles.feedbackLink}
      target="_blank"
      rel="noopener noreferrer"
      href="https://lifechurch.formstack.com/forms/host_feedback_2"
    >
      Give feedback
      <span
        className={styles.externalLinkIcon}
        dangerouslySetInnerHTML={{ __html: FeedbackLink }}
      />
    </a>
    <a
      id="guest-experience"
      className={styles.guestLink}
      href="https://live.life.church/"
    >
      Switch to guest experience
      <span
        className={styles.externalLinkIcon}
        dangerouslySetInnerHTML={{ __html: GuestExperienceLink }}
      />
    </a>
    <Button
      id="logout"
      onClick={logout}
      text="Log out"
      buttonType="default"
    />
    <LanguageSelector
      setLanguage={setLanguage}
      languageOptions={languageOptions}
    />  
  </SideMenuComponent>
);

export default SideMenu;
