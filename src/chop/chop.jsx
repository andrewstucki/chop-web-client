// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import Banner from '../banner';
import Chat from '../pane/content/chat';
import NavBar from '../navBar';
import VideoFeed from '../videoFeed';
import SideMenu from '../sideMenu';
import PopUpModal from '../popUpModal';
import Offline from '../offline';
import { isUsingIPhone, isUsingIPhoneX, isUsingIPhone678, isUsingIPhone678plus } from '../util';

import '../../assets/global.css';
import styles from './styles.css';

class ChopContainer extends React.Component<any> {
  render () {
    document.title = 'Live ' + this.props.organization;
    let wrapperstyle = styles.wrapper;
    if (this.props.focused) {
      if (isUsingIPhone()) {
        if (isUsingIPhoneX()) wrapperstyle = styles.wrapperfocused_iphonex;
        else if (isUsingIPhone678()) wrapperstyle = styles.wrapperfocused_iphone678;  
        else if (isUsingIPhone678plus()) wrapperstyle = styles.wrapperfocused_iphone678plus;
        else wrapperstyle = styles.wrapperfocused_generic_iphone;
      }
    }

    if (this.props.authenticated) {
      return (
        <div id="wrapper" className={wrapperstyle}>
          <SideMenu />
          <div className={styles.chop}>
            <PopUpModal />
            <Banner />
            <NavBar />
            <VideoFeed />
            <Offline />
            <Chat />
          </div>
        </div>
      );
    } else {
      return (
        <Redirect to='/login'/>
      );
    }
  }
}

export default ChopContainer;
