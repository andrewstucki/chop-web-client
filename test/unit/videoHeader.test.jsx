// @flow
import React from 'react';
import {  renderWithTheme } from '../testUtils';
import VideoHeader from '../../src/videoFeed/videoHeader/videoHeader';

describe('Video Header', () => {
  test('It has a title', () => {
    const { getByTestId } = renderWithTheme(
      <VideoHeader
        title='Mastermind'
        description='Week 3'
        endTime={1552399200000}
      />
    );

    expect(getByTestId('videoHeader-title').textContent).toEqual('Mastermind');
  });

  test('It has a subtitle', () => {
    const { getByTestId } = renderWithTheme(
      <VideoHeader
        title='Mastermind'
        description='Week 3'
        endTime={1552399200000}
      />
    );

    expect(getByTestId('videoHeader-description').textContent).toEqual('Week 3');
  });

  test('It has the time remaining', () => {
    const { getByTestId } = renderWithTheme(
      <VideoHeader
        title='Mastermind'
        description='Week 3'
        endTime={Date.now() + 10000000}
      />
    );

    expect(getByTestId('videoHeader-countdown').textContent).toEqual('2:46:40');
  });

  test('It hides the time remaining when offline', () => {
    const { queryByTestId } = renderWithTheme(
      <VideoHeader
        title=''
        description=''
        endTime={0}
      />
    );

    expect(queryByTestId('videoHeader-countdown')).toBeFalsy();
  });
});
