// @flow
import React from 'react';
import Countdown, { zeroPad } from 'react-countdown-now';
import { Wrapper, EventInfo, Title, Description, CountdownWrapper } from './styles';

type VideoHeaderProps = {
  title: string,
  description?: string,
  endTime: number,
};

const MemoziedCountdown = React.memo(Countdown);

const VideoHeader = ({ title, description, endTime }:VideoHeaderProps) => (
  <Wrapper data-testid='videoHeader'>
    <EventInfo>
      <Title data-testid='videoHeader-title'>{title}</Title>
      <Description data-testid='videoHeader-description'>{description}</Description>
    </EventInfo>
    { endTime > 0 &&
      <CountdownWrapper>
        <MemoziedCountdown date={endTime} renderer={countdownRenderer}/>
      </CountdownWrapper>
    }
  </Wrapper>
);

const countdownRenderer = ({ hours, minutes, seconds }) => (
  <span data-testid='videoHeader-countdown'>{hours > 0 ? `${hours}:` : ''}{zeroPad(minutes)}:{zeroPad(seconds)}</span>
);

export default React.memo < VideoHeaderProps > (VideoHeader);

