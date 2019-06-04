// @flow
import React from 'react';
import sinon from 'sinon';
import EventNotes from '../../src/eventNotes/eventNotes';
import ConnectedEventNotes from '../../src/eventNotes';
import { renderWithRedux } from '../testUtils';
import { render, fireEvent } from '@testing-library/react';
import { defaultState as defaultEventState } from '../../src/event/dux';


describe('EventNotes', () => {
  test('Renders a RTE', () => {
    const { getByTestId } = render(
      <EventNotes
        eventNotes=''
        generatePdf={() => {}}
        updateEventNotes={() => {}}
      />);
    expect(getByTestId('eventNotes')).toBeTruthy();
  });

  test('Clicking download generates a PDF', () => {
    const generatePdf = sinon.spy();
    const { container } = render(
      <EventNotes
        eventNotes=''
        generatePdf={generatePdf}
        updateEventNotes={() => {}}
      />);
    fireEvent.click(container.getElementsByClassName('toolbarButton-custom')[0]);
    expect(generatePdf.calledOnce).toBeTrue();
  });

  test('Saves changes on unmount', () => {
    const updateEventNotes = sinon.spy();
    const { unmount } = render(
      <EventNotes
        eventNotes=''
        generatePdf={() => {}}
        updateEventNotes={updateEventNotes}
      />);

    unmount();
    expect(updateEventNotes.calledOnce).toBeTrue();
  });

  test('Renders eventNotes from state', () => {
    const state = {
      event: {
        ...defaultEventState,
        eventNotes: '<h1>Awesome Event</h1>',
      },
    };
    const { container } = renderWithRedux(
      <ConnectedEventNotes />,
      state,
    );
    expect(container.getElementsByClassName('public-DraftEditor-content')[0].textContent).toEqual('Awesome Event');
  });
});
