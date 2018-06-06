// @flow
/* global SyntheticMouseEvent, SyntheticTouchEvent */
import React from 'react';
import SideMenuComponent from '../components/sideMenu';
import Button from '../components/button';
import GuestExperienceLink from '../../assets/guest-experience-link.svg';
import FeedbackLink from '../../assets/feedback-link.svg';
import styles from './styles.css';

type SideMenuType = {
  logout: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  close: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  isClosed: boolean,
  onSwipe?: (event: SyntheticTouchEvent<HTMLButtonElement>) => void,
};

const SideMenu = (
  {
    logout,
    close,
    isClosed,
    onSwipe,
  }: SideMenuType) => (
  <SideMenuComponent
    close={close}
    isClosed={isClosed}
    swipe={onSwipe}>
    <a
      id="feedback"
      className={styles.link}
      href="https://lifechurch.formstack.com/forms/host_mobile_feedback"
    >
      Give feedback
      <span
        className={styles.externalLinkIcon}
        dangerouslySetInnerHTML={{ __html: FeedbackLink }}
      />
    </a>
    <a
      id="guest-experience"
      className={styles.link}
      href="https://live.life.church/"
    >
      Switch to guest experience
      <span
        className={styles.externalLinkIcon}
        dangerouslySetInnerHTML={{ __html: GuestExperienceLink }}
      />
    </a>
    <Button
      onClick={logout}
      text="Log out"
      buttonType="default"
    />
  </SideMenuComponent>
);

export default SideMenu;
