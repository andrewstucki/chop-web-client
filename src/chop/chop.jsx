// @flow
import * as React from 'react';

import Chat from '../chat';
import Feed from '../feed';
import NavBar from '../navBar';
import VideoFeed from '../videoFeed';
import SideMenu from '../sideMenu';
import Placeholder from '../placeholder';
import PopUpModal from '../popUpModal';
import ReactionButton from '../reactionButton';
import { isUsingIPhone, isUsingIPhoneX, isUsingIPhone678, isUsingIPhone678plus } from '../util';

import '../../assets/global.css';
import styles from './styles.css';

class ChopContainer extends React.Component {

  render () {
    var wrapperstyle = styles.wrapper;
    if (this.props.focused) {
      if (isUsingIPhone()) {
        if (isUsingIPhoneX())
          wrapperstyle = styles.wrapperfocused_iphonex;
        else if (isUsingIPhone678())
          wrapperstyle = styles.wrapperfocused_iphone678;  
        else if (isUsingIPhone678plus())
          wrapperstyle = styles.wrapperfocused_iphone678plus;
        else
          wrapperstyle = styles.wrapperfocused_generic_iphone;
      }
    }

    return (
      <div id="wrapper" className={wrapperstyle}>
        <SideMenu />
        <div className={styles.chop}>
          <PopUpModal />
          <NavBar />
          <VideoFeed />
          <Feed />
          <Placeholder />
          <div className={styles.inputs}>
            <Chat />
            <ReactionButton />
          </div>
        </div>
      </div>
    );

  }
}

export default ChopContainer;
