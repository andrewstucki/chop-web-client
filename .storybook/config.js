import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/button.jsx');
  require('../stories/text-field.jsx');
  require('../stories/chat.jsx');
  require('../stories/feed.jsx');
  require('../stories/message.jsx');
}

configure(loadStories, module);