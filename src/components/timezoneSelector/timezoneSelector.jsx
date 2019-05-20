// @flow
import React from 'react';
import dayjs from 'dayjs';
import timeZone from 'dayjs-ext/plugin/timeZone-2012-2022';
import { useTranslation } from 'react-i18next';
import { listTimeZones } from 'timezone-support/dist/index-2012-2022';
import { Wrapper, Label, Select } from './styles';

dayjs.extend(timeZone);

type TimezoneSelectorProps = {
  timeZone: string,
  setScheduleTimeZone: (string) => void,
};

const TimezoneSelector = ({ timeZone, setScheduleTimeZone }:TimezoneSelectorProps) => {
  const { t } = useTranslation();

  const handleChange = event => {
    const { value } = event.target;
    setScheduleTimeZone(value);
  };

  return (
    <Wrapper>
      <Label>
        { `${t('timezone')}: ` }
        <Select
          data-testid={'timezoneSelector-select'}
          onChange={handleChange}
          defaultValue={timeZone}
        >
          <option value='' hidden disabled>Select a timezone</option>
          { listTimeZones().sort().map(tz => <option value={tz} key={tz}>{ tz.replace(/_/g, '') }</option>) }
        </Select>
      </Label>
    </Wrapper>
  );
};

export default TimezoneSelector;
