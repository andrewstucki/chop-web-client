import React from 'react';
import style from './style.css';
import Dismiss from '../../assets/dismiss-banner-button.svg';
import type { BannerType } from './dux';
import { capitalizeFirstLetter } from '../util/index';
import Button from '../components/button';

type BannerProps = {
  banner: BannerType,
  dismissNotification: () => void,
};

const notificationStyle = {
  backgroundColor: '#09C1A1',
};

const errorStyle = {
  backgroundColor: '#E33300',
};

const Banner = (
  {
    banner,
    dismissNotification,
  }: BannerProps
) => {
  const dismissButton = () => (
    <Button
      onClick={dismissNotification}
      image={Dismiss}
      buttonStyle="icon"
      additionalStyles={style.closeBannerButton}
    />
  );
  if (banner.message !== '' && banner.bannerType !== '') {
    if (banner.bannerType === 'notification') {
      return (
        <div className={style.banner} style={notificationStyle}>
          {dismissButton()}
          <div className={style.message}><strong>{capitalizeFirstLetter(banner.message)}</strong> was muted.</div>
        </div>
      );
    } else {
      return (
        <div className={style.banner} style={errorStyle}>
          {dismissButton()}
          <div className={style.message}>{banner.message}</div>
        </div>
      );
    } 
  } 
  return null;
};

export default Banner;