// @flow
import React from 'react';
import Pane from '../../src/pane/pane';
import sinon from 'sinon';
import { renderWithReduxAndTheme } from '../testUtils';


describe('Pane', () => {
  test('It prevents two event panes from rendering on MediumPlus', () => {
    const setPaneToChat = sinon.spy();
    const { queryByTestId } = renderWithReduxAndTheme(
      <Pane
        name='primary'
        isMediumPlusUp={true}
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
      />);

    expect(queryByTestId('pane')).toBeTruthy();
    expect(setPaneToChat.calledOnce).toBeTruthy();
  });
});
