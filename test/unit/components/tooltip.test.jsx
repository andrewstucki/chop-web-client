// @flow
import React from 'react';
import Tooltip from '../../../src/components/tooltip';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../testUtils';

describe('Tooltip', () => {
  test('Renders an info icon', () => {
    const { getByTestId } = renderWithTheme(
      <Tooltip content={<div>The Content</div>} />
    );
    expect(getByTestId('tooltip-icon')).toBeTruthy();
  });

  test('Mounts/unmounts on click', () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
      <Tooltip content={<div>The Content</div>} />
    );

    fireEvent.click(getByTestId('tooltip-icon'));
    expect(getByTestId('tooltip-content')).toBeTruthy();
    expect(getByTestId('tooltip-content').textContent).toEqual('The Content');

    fireEvent.click(getByTestId('tooltip-icon'));
    expect(queryByTestId('tooltip-content')).toBeFalsy();
  });

  test('Mounts/unmounts on hover', () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
      <Tooltip content={<div>The Content</div>} />
    );

    fireEvent.mouseEnter(getByTestId('tooltip-icon'));
    expect(getByTestId('tooltip-content')).toBeTruthy();
    expect(getByTestId('tooltip-content').textContent).toEqual('The Content');

    fireEvent.mouseLeave(getByTestId('tooltip-icon'));
    expect(queryByTestId('tooltip-content')).toBeFalsy();
  });
});
