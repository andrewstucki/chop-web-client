// @flow
import React from 'react';
import dayjs from 'dayjs-ext';
import timeZone from 'dayjs-ext/plugin/timeZone-2012-2022';
import type { EventScheduleType } from './dux';
import { Wrapper, GroupHeader, ItemsWrapper, Item, ItemTime, ItemTitle, NoScheduleWrapper, NoScheduleText } from './styles';
import { useTranslation } from 'react-i18next';

dayjs.extend(timeZone);

type ScheduleProps = {
  schedule: {
    [string]: Array<EventScheduleType>
  },
  timeZone: string,
};

const Schedule = ({schedule, timeZone }:ScheduleProps) => {
  const { t } = useTranslation();
  if (Object.keys(schedule).length === 0) {
    return (
      <NoScheduleWrapper data-testid='schedule-noschedule'>
        <NoScheduleText>
          {t('no_upcoming_schedule')}
        </NoScheduleText>
      </NoScheduleWrapper>
    );
  }

  return (
    <Wrapper data-testid='schedule'>
      {
        Object.keys(schedule).map(day => (
          <div key={day}>
            <GroupHeader data-testid='schedule-groupHeader'>
              { dayjs.unix(schedule[day][0].scheduleTime).format('dddd MMMM, D', { timeZone }) }
            </GroupHeader>
            <ItemsWrapper data-testid='schedule-itemsWrapper'>
              {
                schedule[day].map((item, index) => (
                  <Item showBorder={index !== schedule[day].length - 1} key={item.scheduleTime}>
                    <ItemTime data-testid='schedule-itemTime'>
                      { dayjs.unix(item.scheduleTime).format('h:mma', { timeZone }) }
                    </ItemTime>
                    <ItemTitle data-testid='schedule-itemTitle'>
                      { item.title }
                    </ItemTitle>
                  </Item>
                ))
              }
            </ItemsWrapper>
          </div>
        ))
      }
    </Wrapper>
  );
};

export default React.memo<ScheduleProps>(Schedule);
