import React from 'react';
import Dismiss from '../icons/dismiss-button';
import type { BannerType } from './dux';
import { capitalizeFirstLetter } from '../util/index';
import {IconButton} from '../components/button/styles';
import {
  WarningBanner,
  ErrorBanner,
  NotificationBanner,
  BannerMessage,
} from './styles';
import {Actionable} from '../components/Actionable';
import { theme } from '../styles';

type BannerProps = {
  banner: BannerType,
  dismissNotification: () => void,
};

const DismissButton = ({dismissNotification}) => (
  <Actionable onClick={dismissNotification}>
    <IconButton size={48}>
      <Dismiss size={16} color={theme.colors.textColor} />
    </IconButton>
  </Actionable>
);

const Banner = (
  {
    banner,
    dismissNotification,
  }: BannerProps
) => {
  if (banner.message === '') {
    return null;
  }
  switch (banner.bannerType) {
  case 'notification':
    return (
      <NotificationBanner>
        <DismissButton dismissNotification={dismissNotification}/>
        <BannerMessage><strong>{capitalizeFirstLetter(banner.message)}</strong> was muted.</BannerMessage>
      </NotificationBanner>
    );
  case 'error':
    return (
      <ErrorBanner>
        <DismissButton dismissNotification={dismissNotification}/>
        <BannerMessage>{banner.message}</BannerMessage>
      </ErrorBanner>
    );
  case 'warning':
    return (
      <WarningBanner>
        <DismissButton dismissNotification={dismissNotification}/>
        <BannerMessage>{banner.message}</BannerMessage>
      </WarningBanner>
    );
  default:
    return null;
  }
};

export default Banner;