// @flow
import React from 'react';
import Pane from '../../src/pane/pane';
import sinon from 'sinon';
import { render } from 'react-testing-library';


describe('Pane', () => {
  test('It prevents two event panes from rendering on MediumPlus', () => {
    const setPaneToChat = sinon.spy();
    const { queryByTestId } = render(
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

    expect(queryByTestId('pane')).toBeFalsy();
    expect(setPaneToChat.calledOnce).toBeTruthy();
  });
});
