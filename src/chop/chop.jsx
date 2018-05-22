// @flow
import * as React from 'react';
import Chat from '../chat';
import Feed from '../feed';
import NavBar from '../navBar';
import VideoFeed from '../videoFeed';
import '../../assets/global.css';
import chopStyles from './styles.css';

const ChopContainer = ()  => (
  <div className={chopStyles.chop}>
    <NavBar />
    <VideoFeed />
    <Feed />
    <Chat />
  </div>
);

export default ChopContainer;
