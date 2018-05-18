// @flow
import * as React from 'react';
import Chat from '../chat';
import Feed from '../feed';
import NavBar from '../navBar';
import '../../assets/global.css';
import chopStyles from './styles.css';

const ChopContainer = ()  => (
  <div className={chopStyles.chop}>
    <NavBar />
    <Feed />
    <Chat />
  </div>
);

export default ChopContainer;
