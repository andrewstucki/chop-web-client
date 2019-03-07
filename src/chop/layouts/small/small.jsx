// @flow
import * as React from 'react';

import Banner from '../../../banner';
import NavBar from '../../../navbar';
import VideoFeed from '../../../videoFeed';
import SideMenu from '../../../sideMenu';
import PopUpModal from '../../../popUpModal';
import Pane from '../../../pane';
import { PRIMARY_PANE } from '../../../pane/dux';
import { Container } from './styles';

type SmallProps = {
  isVideoHidden: boolean,
  toggleHideVideo: (hidden:boolean) => void,
};

type SmallState = {
  previousInnerHeight: number,
};

class Small extends React.Component<SmallProps, SmallState> {
  handleResize: () => void;

  constructor (props:SmallProps) {
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
    return (
      <>
        <SideMenu />
        <Container>
          <PopUpModal />
          <Banner />
          <NavBar />
          <VideoFeed />
          <Pane name={PRIMARY_PANE} />
        </Container>
      </>
    );
  }
}

export default Small;
