import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/button.jsx');
  require('../stories/text-field.jsx');
  require('../stories/chat.jsx');
}

configure(loadStories, module);