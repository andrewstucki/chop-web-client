// @flow
import * as React from 'react';

import Banner from '../../../banner';
import VideoFeed from '../../../videoFeed';
import SideMenu from '../../../sideMenu';
import PopUpModal from '../../../popUpModal';
import Pane from '../../../pane';
import { PRIMARY_PANE } from '../../../pane/dux';
import NavMenu from '../../../navMenu';
import { Container, CellContainerTop, CellContainerBottom } from './styles';
import { Grid, Cell } from 'styled-css-grid';
import { useWindowSize } from '../../../hooks';

type MediumProps = {
  isVideoHidden: boolean,
  toggleHideVideo: (hidden:boolean) => void,
  hasVideo: boolean,
};

const Medium = ({ isVideoHidden, toggleHideVideo, hasVideo }:MediumProps) => {
  const { height } = useWindowSize();

  if (height < 400 && !isVideoHidden) {
    toggleHideVideo(true);
  } else if (height >= 400) {
    toggleHideVideo(false);
  }

  return (
    <Container>
      <SideMenu />
      <PopUpModal />
      <Banner />
      <Grid columns={'max-content 1fr'}
        rows={'max-content 1fr'}
        areas={[
          'menu video',
          'menu chat',
        ]}
        height="100%"
        width="100%"
        columnGap="0px">
        <Cell area="menu">
          <NavMenu/>
        </Cell>
        { hasVideo &&
        <Cell area="video">
          <CellContainerTop>
            <VideoFeed/>
          </CellContainerTop>
        </Cell>
        }
        <Cell area="chat">
          <CellContainerBottom>
            <Pane name={PRIMARY_PANE} />
          </CellContainerBottom>
        </Cell>
      </Grid>
    </Container>
  );
};

export default React.memo < MediumProps > (Medium);
