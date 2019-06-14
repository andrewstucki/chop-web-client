// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import EventNotes from '../src/eventNotes/eventNotes';
import Tooltip from '../src/components/tooltip';
import InputField from '../src/components/inputField';

storiesOf('Tooltip', module).add('Default', () =>
  <Tooltip
    style={{ marginLeft: '200px' }}
    content={<div>Popper Content</div>}
  />
);

storiesOf('InputField', module).add('with Tooltip', () =>
  <div
    style={{ margin: '200px' }}>
    <InputField
      type='button'
      label='Label'
      name='label'
      tooltipContent={<div>This is the tooltip.</div>}
    />
  </div>
).add('with Long Tooltip', () =>
  <div
    style={{ margin: '200px' }}>
    <InputField
      type='button'
      label='Label'
      name='label'
      tooltipContent={
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolorem ea inventore laboriosam maxime natus non nulla saepe. Alias blanditiis est ex ipsam nobis non quis soluta. Asperiores incidunt, placeat!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda autem consequatur distinctio dolorem eligendi eveniet facilis necessitatibus, nisi odit officia placeat quam qui quisquam temporibus totam, voluptates? Ipsum, similique!</p>
        </div>
      }
    />
  </div>
).add('with Iframe', () =>
  <div
    style={{ margin: '200px' }}>
    <InputField
      type='button'
      label='Label'
      name='label'
      tooltipContent={
        <iframe
          title='iframeTooltip'
          src="https://giphy.com/embed/wJqqUvFprCoTK"
          width="100%"
          height="100%"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
      }
    />
  </div>
);

storiesOf('Notes', module).add('Default', () =>
  <EventNotes eventNotes='<p>Test notes</p>' generatePdf={() => {}} updateEventNotes={() => {}} />);
