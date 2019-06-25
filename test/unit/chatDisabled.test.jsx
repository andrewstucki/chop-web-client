// @flow
import React from 'react';
import { renderWithTheme } from '../testUtils';
import ChatDisabled from '../../src/pane/content/chatDisabled';

describe('ChatDisabled', () => {
  test('it renders an image and text', () => {
    const { getByTestId } = renderWithTheme(<ChatDisabled/>);

    expect(getByTestId('chatDisabled').getElementsByTagName('img').length).toEqual(1);
    expect(getByTestId('chatDisabled').textContent).toEqual('public_chat_disabled');
  });
});
