// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import Banner from '../banner';
import NavBar from '../navBar';
import VideoFeed from '../videoFeed';
import SideMenu from '../sideMenu';
import PopUpModal from '../popUpModal';
import Pane from '../pane';
import { PRIMARY_PANE } from '../pane/dux';

import styles from './styles.css';

type ChopContainerProps = {
  authenticated: boolean,
  organization: string,
  isVideoHidden: boolean,
  toggleHideVideo: (hidden:boolean) => void,
};

type ChopContainerState = {
  previousInnerHeight: number,
};

class ChopContainer extends React.Component<ChopContainerProps, ChopContainerState> {
  handleResize: () => void;

  constructor (props:ChopContainerProps) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      previousInnerHeight: window.innerHeight,
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount (): void {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize (): void {
    const { isVideoHidden, toggleHideVideo } = this.props;
    const { previousInnerHeight } = this.state;
    const { innerHeight: currentInnerHeight } = window;
    const resizeSmaller = currentInnerHeight < previousInnerHeight;

    if (resizeSmaller && !isVideoHidden) {
      toggleHideVideo(true);
    } else if (isVideoHidden) {
      toggleHideVideo(false);
    }

    this.setState({previousInnerHeight: currentInnerHeight});
  }

  render () {
    document.title = 'Live ' + this.props.organization;

    if (this.props.authenticated) {
      return (
        <div id="wrapper" className={styles.wrapper}>
          <SideMenu />
          <div className={styles.chop}>
            <PopUpModal />
            <Banner />
            <NavBar />
            <VideoFeed />
            <Pane name={PRIMARY_PANE} />
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

export default React.memo < ChopContainerProps > (ChopContainer);
