import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoFeed from '../src/videoFeed/videoFeed';

storiesOf('VideoFeed', module)
  .add('VideoFeed chat not focused', () => (
    <VideoFeed isChatFocused={false} />
  )).add('VideoFeed chat focused', () => (
    <VideoFeed isChatFocused={true} />
  ));
