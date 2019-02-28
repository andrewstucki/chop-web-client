// @flow
import React from 'react';
import { Wrapper, Heading, EventName} from './styles';

type OfflinePropsType = {
  eventName: string,
  eventTime: string
};

const Offline = ({ eventName, eventTime }: OfflinePropsType) => (
  <Wrapper>
    <div>
      <Heading>Upcoming Event</Heading>
      <EventName>{eventName}</EventName>
      <p>{eventTime}</p>
    </div>
  </Wrapper>
);

Offline.whyDidYouRender = true;

export default React.memo < OfflinePropsType > (Offline);
