// @flow
import React from 'react';
import Dismiss from '../icons/dismissButton';
import type { BannerType } from './dux';
import IconButton from '../components/iconButton';
import {
  WarningBanner,
  ErrorBanner,
  NotificationBanner,
  BannerMessage,
  BannerWrapper,
} from './styles';
import { theme } from '../styles';
import { COMPACT } from '../textModeToggle/dux';
import {
  MUTED_NOTIFICATION,
  ERROR,
  WARNING,
  TEXT_MODE_NOTIFICATION,
} from './dux';
import { Trans, useTranslation } from 'react-i18next';

type BannerProps = {
  banner: BannerType,
  fullWidth: boolean,
  dismissNotification: () => void,
};

const DismissButton = ({dismissNotification}) => (
  <IconButton onClick={dismissNotification} size={48} id='banner-dismiss-button'>
    <Dismiss size={16} color={theme.colors.alternateTextColor} />
  </IconButton>
);

const Banner = (
  {
    banner,
    fullWidth,
    dismissNotification,
  }: BannerProps
) => {
  const { t } = useTranslation('notifications');
  if (banner.message === '') {
    return null;
  }
  switch (banner.bannerType) {
    case MUTED_NOTIFICATION:
      return (
        <BannerWrapper>
          <NotificationBanner fullWidth={fullWidth} data-testid='muted-notification-banner'>
            <DismissButton dismissNotification={dismissNotification}/>
            <BannerMessage data-testid='banner-message'>
              <Trans ns='notifications' i18nKey='user_muted'>
                {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
                <strong>{{name}}</strong> was muted.
              </Trans>
            </BannerMessage>
          </NotificationBanner>
        </BannerWrapper>
      );
    case ERROR:
      return (
        <BannerWrapper>
          <ErrorBanner fullWidth={fullWidth} data-testid='error-banner'>
            <DismissButton dismissNotification={dismissNotification}/>
            <BannerMessage data-testid='banner-message'>{banner.message}</BannerMessage>
          </ErrorBanner>
        </BannerWrapper>
      );
    case WARNING:
      return (
        <BannerWrapper>
          <WarningBanner fullWidth={fullWidth} data-testid='warning-banner'>
            <DismissButton dismissNotification={dismissNotification}/>
            <BannerMessage data-testid='banner-message'>{banner.message}</BannerMessage>
          </WarningBanner>
        </BannerWrapper>
      );
    case TEXT_MODE_NOTIFICATION: {
      const text = banner.message === COMPACT ? 'decreased' : 'increased';
      return (
        <BannerWrapper>
          <NotificationBanner fullWidth={fullWidth} data-testid='text-mode-notification-banner'>
            <DismissButton dismissNotification={dismissNotification}/>
            <BannerMessage data-testid='banner-message'>
              {t('text_mode_updated', {text})}
            </BannerMessage>
          </NotificationBanner>
        </BannerWrapper>
      );
    }
    default:
      return null;
  }
};

export default Banner;
