// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import EventNotes from '../src/eventNotes/eventNotes';

storiesOf('Notes', module).add('to Storybook', () => <EventNotes eventNotes='<p>Test notes</p>' generatePdf={() => {}} updateEventNotes={() => {}} />);
