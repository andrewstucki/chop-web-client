// @flow
import React from 'react';
import { Wrapper, Heading, EventName} from './styles';
import { useTranslation } from 'react-i18next';

type OfflinePropsType = {
  eventName: string,
  eventTime: string
};

const Offline = ({ eventName, eventTime }: OfflinePropsType) => {
  const { t } = useTranslation();
  return (
    <Wrapper data-testid='offline'>
      <div>
        {
          eventName && eventTime ?
            <>
              <Heading data-testid='offline-header'>{t('upcoming_event')}</Heading>
              <EventName data-testid='offline-name'>{eventName}</EventName>
              <p data-testid='offline-time'>{eventTime}</p>
            </>
            :
            <Heading data-testid='offline-noevent'>{t('no_upcoming_event')}</Heading>
        }
      </div>
    </Wrapper>
  );
};

export default React.memo < OfflinePropsType > (Offline);
