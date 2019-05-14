// @flow
import React from 'react';
import type { ScheduleType } from './dux';

type ScheduleProps = {
  schedule: {
    [string]: ScheduleType
  }
};

const Schedule = ({schedule}:ScheduleProps) => {

  if (schedule === null) {
    return null;
  }

  return (
    <div>
      {
        Object.keys(schedule).map(day => {
          schedule[day].map(item => (<div>item.startTime</div>));
        })
      }
    </div>
  );
};

export default React.memo<ScheduleProps>(Schedule);
