// @flow
import React from 'react';
import 'jest-styled-components';
import Tab from '../../src/pane/content/tab';
import { HOST_INFO } from '../../src/hostInfo/dux';
import { renderWithReduxAndTheme } from '../testUtils';

describe('Tab tests', () => {
  test('Tab Type renders', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Tab
        type={HOST_INFO}
        removeTab={() => {}}
      />,
      {
        event: {
          title: 'Event',
          id: 123,
          eventTimeId: 0,
          startTime: 0,
          hostInfo: '<p>The information for the hosts.</p>',
        },
      }
    );

    expect(getByTestId('hostInfo')).toBeTruthy();
  });

  test('Tab has an action banner on small devices', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Tab
        type={HOST_INFO}
        removeTab={() => {}}
      />,
      {
        event: {
          title: 'Event',
          id: 123,
          eventTimeId: 0,
          startTime: 0,
          hostInfo: '<p>The information for the hosts.</p>',
        },
      }
    );

    expect(getByTestId('tabHeader')).toBeTruthy();
  });
});
