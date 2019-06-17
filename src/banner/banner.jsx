// @flow
import React from 'react';
import Dismiss from '../icons/dismissButton';
import type { BannerType } from './dux';
import IconButton from '../components/iconButton';
import {
  Banner,
  BannerMessage,
  BannerWrapper,
  NOTIFICATION,
} from './styles';
import { theme } from '../styles';
import { COMPACT } from '../textModeToggle/dux';
import {
  MUTED,
  ERROR,
  WARNING,
  TEXT_MODE,
  LOGGED_IN,
  LOGGED_OUT,
  PASSWORD_RESET,
} from './dux';
import { Trans, useTranslation } from 'react-i18next';

type BannerProps = {
  banner: BannerType,
  fullWidth: boolean,
  name: string,
  dismissNotification: () => void,
};

const DismissButton = ({dismissNotification}) => (
  <IconButton onClick={dismissNotification} size={48} id='banner-dismiss-button'>
    <Dismiss size={16} color={theme.colors.alternateTextColor} />
  </IconButton>
);

const NotificationBanner = (
  {
    banner,
    fullWidth,
    name,
    dismissNotification,
  }: BannerProps
) => {
  const { t } = useTranslation('notifications');
  if (banner.type) {
    switch (banner.type) {
      case MUTED: {
        if (banner.name) {
          return (
            <BannerWrapper>
              <Banner fullWidth={fullWidth} data-testid='muted-notification-banner' type={NOTIFICATION}>
                <DismissButton dismissNotification={dismissNotification}/>
                <BannerMessage data-testid='banner-message'>
                  <Trans ns='notifications' i18nKey='susbcriber_muted'>
                    {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
                    <strong>{{name:banner.name}}</strong> was muted.
                  </Trans>
                </BannerMessage>
              </Banner>
            </BannerWrapper>
          );
        } else return null;
      }
      case ERROR: {
        if (banner.error) {
          return (
            <BannerWrapper>
              <Banner fullWidth={fullWidth} data-testid='error-banner' type={ERROR}>
                <DismissButton dismissNotification={dismissNotification}/>
                <BannerMessage data-testid='banner-message'>{t(banner.error)}</BannerMessage>
              </Banner>
            </BannerWrapper>
          );
        } else return null;
      }
      case WARNING: {
        if (banner.warning) {
          return (
            <BannerWrapper>
              <Banner fullWidth={fullWidth} data-testid='warning-banner' type={WARNING}>
                <DismissButton dismissNotification={dismissNotification}/>
                <BannerMessage data-testid='banner-message'>{banner.warning}</BannerMessage>
              </Banner>
            </BannerWrapper>
          );
        } else return null;
      }
      case TEXT_MODE: {
        const mode = banner.mode === COMPACT ? 'decreased' : 'increased';
        return (
          <BannerWrapper>
            <Banner fullWidth={fullWidth} data-testid='text-mode-notification-banner' type={NOTIFICATION}>
              <DismissButton dismissNotification={dismissNotification}/>
              <BannerMessage data-testid='banner-message'>
                {t('text_mode_updated', {mode})}
              </BannerMessage>
            </Banner>
          </BannerWrapper>
        );
      }
      case LOGGED_IN: {
        if (name) {
          return (
            <BannerWrapper>
              <Banner fullWidth={fullWidth} data-testid='logged-in-banner' type={NOTIFICATION}>
                <DismissButton dismissNotification={dismissNotification}/>
                <BannerMessage data-testid='banner-message'>
                  <Trans ns='notifications' i18nKey='logged_in'>
                    {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
                    Logged in as <strong>{{name}}</strong>
                  </Trans>
                </BannerMessage>
              </Banner>
            </BannerWrapper>
          );
        } else return null;
      }
      case PASSWORD_RESET: 
        return (
          <BannerWrapper>
            <Banner fullWidth={fullWidth} data-testid='password-reset-notification-banner' type={NOTIFICATION}>
              <DismissButton dismissNotification={dismissNotification}/>
              <BannerMessage data-testid='banner-message'>
                {t('password_reset')}
              </BannerMessage>
            </Banner>
          </BannerWrapper>
        );
      case LOGGED_OUT: 
        return (
          <BannerWrapper>
            <Banner fullWidth={fullWidth} data-testid='logged-out-notification-banner' type={NOTIFICATION}>
              <DismissButton dismissNotification={dismissNotification}/>
              <BannerMessage data-testid='banner-message'>
                {t('logged_out')}
              </BannerMessage>
            </Banner>
          </BannerWrapper>
        );
      default:
        return null;
    }
  } else {
    return null;
  }
};

export default NotificationBanner;
