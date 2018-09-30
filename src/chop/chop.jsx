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

import '../../assets/global.css';
import chopStyles from './styles.css';

class ChopContainer extends React.Component {

  render () {
    var wrapperstyle = chopStyles.wrapper;
    if (this.props.focused) {
      var iPhone = !!navigator.platform && /iPhone/.test(navigator.platform);
      if (iPhone) {
        wrapperstyle = chopStyles.wrapperfocused_generic_iphone;
        // using info from https://51degrees.com/blog/device-detection-for-apple-iphone-and-ipad
        if (window.screen.height / window.screen.width == 812 / 375 && window.devicePixelRatio == 3)
          wrapperstyle = chopStyles.wrapperfocused_iphonex;
        if (window.screen.height / window.screen.width == 736 / 414 && window.devicePixelRatio == 3)
          wrapperstyle = chopStyles.wrapperfocused_iphone678plus;  // iPhone 6+/6s+/7+/8+
        if (window.screen.height / window.screen.width == 667 / 375 && window.devicePixelRatio == 2)
          wrapperstyle = chopStyles.wrapperfocused_iphone678;  // 6/6s/7/8
      }
    }

    return (
      <div id="wrapper" className={wrapperstyle}>
        <SideMenu />
        <div className={chopStyles.chop}>
          <PopUpModal />
          <NavBar />
          <VideoFeed />
          <Feed />
          <Placeholder />
          <div className={chopStyles.inputs}>
            <Chat />
            <ReactionButton />
          </div>
        </div>
      </div>
    );

  }
}

export default ChopContainer;
