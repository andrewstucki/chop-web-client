// @flow
import React from 'react';
import sinon from 'sinon';
import { fireEvent } from 'react-testing-library';
import { renderWithTheme } from '../testUtils';

import AnchorMoment from '../../src/anchorMoment/anchorMoment';


describe('AnchorMoment tests', () => {
  test('Salvation AnchorMoment renders', () => {
    const { getByTestId } = renderWithTheme(
      <AnchorMoment
        anchorMoment={
          {
            type: 'ANCHOR_MOMENT',
            anchorMomentType: 'SALVATION',
            id: '12345',
          }
        }
        releaseAnchorMoment={() => {}}
        isAnchorMomentAnchored={true}
        currentChannel={'public'}
        salvations={4}
      />
    );

    expect(getByTestId('salvationText').textContent).toEqual(
      'salvation.text'
    );
    expect(getByTestId('salvationHands').textContent).toEqual('salvation.hands_raised');
  });

  test('Salvation AnchorMoment renders in feed', () => {
    const { getByTestId } = renderWithTheme(
      <AnchorMoment
        anchorMoment={
          {
            type: 'ANCHOR_MOMENT',
            anchorMomentType: 'SALVATION',
            id: '12345',
          }
        }
        releaseAnchorMoment={() => {}}
        isAnchorMomentAnchored={false}
        currentChannel={'public'}
        salvations={1}
      />
    );

    expect(getByTestId('salvationText').textContent).toEqual(
      'salvation.text'
    );
    expect(getByTestId('salvationHands').textContent).toEqual('salvation.hands_raised');
  });

  test('AnchorMoment has a close button and it can be clicked', () => {
    const releaseAnchorMoment = sinon.spy();
    const { getByTestId } = renderWithTheme(
      <AnchorMoment
        anchorMoment={
          {
            type: 'ANCHOR_MOMENT',
            anchorMomentType: 'SALVATION',
            id: '12345',
          }
        }
        releaseAnchorMoment={releaseAnchorMoment}
        isAnchorMomentAnchored={true}
        currentChannel={'public'}
        salvations={1}
      />
    );

    fireEvent.click(getByTestId('releaseAnchorMoment'));
    expect(releaseAnchorMoment.calledOnce).toEqual(true);
  });
});
