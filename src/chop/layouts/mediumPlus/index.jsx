// @flow
import * as React from 'react';

import Banner from '../../../banner';
import VideoFeed from '../../../videoFeed';
import SideMenu from '../../../sideMenu';
import PopUpModal from '../../../popUpModal';
import Pane from '../../../pane';
import styled from 'styled-components';
import { PRIMARY_PANE } from '../../../pane/dux';
import NavMenu from '../../../navMenu';
import { Container, CellContainer } from './styles';
import { Grid, Cell } from 'styled-css-grid';
import Event from '../../../pane/content/event';
import { PaneWrapper, PaneContentWrapper } from '../../../pane/styles';

// For some reason the height: 100% doesn't take the height: calc() into account
const GridCell = styled(Cell)`height: initial`;

type MediumPlusProps = {
  hasVideo: boolean,
};

const MediumPlus = ({hasVideo}:MediumPlusProps) => (
  <Container>
    <SideMenu />
    <PopUpModal />
    <Banner />
    <Grid
      columns={'auto 1fr 1fr'}
      rows={'auto 1fr'}
      areas={[
        'menu video public',
        'menu chat public',
      ]}
      height="100%"
      width="100%"
      columnGap='0'>
      <GridCell area="menu">
        <NavMenu/>
      </GridCell>
      {hasVideo &&
        <GridCell area="video">
          <CellContainer topCell>
            <VideoFeed/>
          </CellContainer>
        </GridCell>
      }
      <GridCell area="chat">
        <CellContainer bottomCell>
          <Pane name={PRIMARY_PANE} isMediumPlusUp />
        </CellContainer>
      </GridCell>
      <GridCell area="public">
        <CellContainer staticCell>
          <PaneWrapper>
            <PaneContentWrapper>
              <Event />
            </PaneContentWrapper>
          </PaneWrapper>
        </CellContainer>
      </GridCell>
    </Grid>
  </Container>
);


export default React.memo < MediumPlusProps > (MediumPlus);
