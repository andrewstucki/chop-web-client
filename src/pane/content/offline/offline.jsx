// @flow
import React from 'react';
import { Wrapper, Heading, EventName} from './styles';

type OfflinePropsType = {
  eventName: string,
  eventTime: string
};

const Offline = ({ eventName, eventTime }: OfflinePropsType) => (
  <Wrapper data-testid='offline'>
    <div>
      {
        eventName && eventTime ?
          <>
            <Heading data-testid='offline-header'>Upcoming Event</Heading>
            <EventName data-testid='offline-name'>{eventName}</EventName>
            <p data-testid='offline-time'>{eventTime}</p>
          </>
          :
          <Heading data-testid='offline-noevent'>No upcoming Event.</Heading>
      }
    </div>
  </Wrapper>
);

export default React.memo < OfflinePropsType > (Offline);
