// @flow
import React from 'react';
import TimezoneSelector from '../../../src/components/timezoneSelector';
import { fireEvent } from '@testing-library/react';
import { renderWithReduxAndTheme } from '../../testUtils';
import { getScheduleTimeZone } from '../../../src/schedule/dux';

describe('TimezoneSelector', () => {
  test('Changes the schedule timezone', () => {
    const { store, getByTestId } = renderWithReduxAndTheme(
      <TimezoneSelector />
    );
    fireEvent.change(getByTestId('timezoneSelector-select'), { target: { value: 'Pacific/Fiji' } });
    expect(getScheduleTimeZone(store.getState())).toEqual('Pacific/Fiji');
  });
});
