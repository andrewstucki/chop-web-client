// @flow
import React from 'react';
import TimezoneSelector from '../../components/timezoneSelector';
import { Wrapper, Title } from '../styles';
import { TimezoneSelectorWrapper } from './styles';
import { MediumUp } from '../../util/responsive';

const SCHEDULE_HEADER = 'SCHEDULE_HEADER';

type ScheduleHeaderType = {
  type: typeof SCHEDULE_HEADER,
  data: ScheduleHeaderProps,
};

type ScheduleHeaderProps = {
  title: string,
};

const ScheduleHeader = ({ title }:ScheduleHeaderProps) => (
  <Wrapper data-testid='scheduleHeader'>
    <MediumUp>
      <Title data-testid='scheduleHeader-title'>
        {title}
      </Title>
    </MediumUp>
    <TimezoneSelectorWrapper>
      <TimezoneSelector />
    </TimezoneSelectorWrapper>
  </Wrapper>
);

export default React.memo < ScheduleHeaderProps > (ScheduleHeader);
export { SCHEDULE_HEADER };
export type { ScheduleHeaderType };
