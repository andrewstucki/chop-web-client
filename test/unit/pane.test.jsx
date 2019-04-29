// @flow
import React from 'react';
import Pane from '../../src/pane/pane';
import sinon from 'sinon';
import { renderWithReduxAndTheme } from '../testUtils';


describe('Pane', () => {
  test('It prevents two event panes from rendering on Large', () => {
    const setPaneToChat = sinon.spy();
    const { queryByTestId } = renderWithReduxAndTheme(
      <Pane
        name='primary'
        isLarge={true}
        isXlarge={false}
        pane={{
          type: 'EVENT',
          content: {
            channelId: 'public',
          },
        }}
        hostChannel='host'
        prevNavbarIndex={0}
        navbarIndex={0}
        setPaneToChat={setPaneToChat}
        setPaneToTab={() => {}}
      />);

    expect(queryByTestId('pane')).toBeTruthy();
    expect(setPaneToChat.calledOnce).toBeTruthy();
  });

  test('It prevents two event or host panes from rendering on Xlarge', () => {
    const setPaneToTab = sinon.spy();
    const { queryByTestId } = renderWithReduxAndTheme(
      <Pane
        name='primary'
        isLarge={false}
        isXlarge={true}
        pane={{
          type: 'EVENT',
          content: {
            channelId: 'public',
          },
        }}
        hostChannel='host'
        prevNavbarIndex={0}
        navbarIndex={0}
        setPaneToChat={() => {}}
        setPaneToTab={setPaneToTab}
      />);

    expect(queryByTestId('pane')).toBeTruthy();
    expect(setPaneToTab.calledOnce).toBeTruthy();
  });
});
