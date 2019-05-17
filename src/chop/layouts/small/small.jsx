// @flow
import React from 'react';
import Banner from '../../../banner';
import NavHeader from '../../../navHeader';
import NavBar from '../../../navbar';
import VideoFeed from '../../../videoFeed';
import SideMenu from '../../../sideMenu';
import PopUpModal from '../../../popUpModal';
import Pane from '../../../pane';
import { PRIMARY_PANE } from '../../../pane/dux';
import { Container } from './styles';
import { useWindowSize } from '../../../hooks';

type SmallProps = {
  isVideoHidden: boolean,
  toggleHideVideo: (hidden:boolean) => void,
};

const Small = ({ isVideoHidden, toggleHideVideo }:SmallProps) => {
  const { height } = useWindowSize();

  if (height < 400 && !isVideoHidden) {
    toggleHideVideo(true);
  } else if (height >= 400) {
    toggleHideVideo(false);
  }

  return (
    <>
      <SideMenu />
      <Container>
        <PopUpModal />
        <Banner fullWidth/>
        <NavHeader />
        <VideoFeed />
        <NavBar />
        <Pane name={PRIMARY_PANE} />
      </Container>
    </>
  );
};

export default React.memo < SmallProps > (Small);
