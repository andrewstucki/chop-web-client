import { configure } from '@storybook/react';

function loadStories() {
  require('../../stories/button.jsx');
  require('../../stories/chat.jsx');
  require('../../stories/moment.jsx');
  require('../../stories/videoFeed.jsx');
  require('../../stories/sideMenu.jsx');
  require('../../stories/messageTray.jsx');
  require('../../stories/popUpModal.jsx');
  require('../../stories/feedActionBanner.jsx');
  require('../../stories/reactionButton.jsx');
  //require('../../stories/errors.jsx');
}

configure(loadStories, module);
