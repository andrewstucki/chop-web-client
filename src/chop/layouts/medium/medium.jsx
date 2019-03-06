// @flow
import * as React from 'react';

import Banner from '../../../banner';
import VideoFeed from '../../../videoFeed';
import SideMenu from '../../../sideMenu';
import PopUpModal from '../../../popUpModal';
import Pane from '../../../pane';
import { PRIMARY_PANE } from '../../../pane/dux';
import NavMenu from '../../../navMenu';
import { Container, CellContainer } from './styles';
import { Grid, Cell } from 'styled-css-grid';

type MediumProps = {
  isVideoHidden: boolean,
  toggleHideVideo: (hidden:boolean) => void,
};

type MediumState = {
  previousInnerHeight: number,
};

class Medium extends React.Component<MediumProps, MediumState> {
  handleResize: () => void;

  constructor (props:MediumProps) {
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
          <Cell area="video">
            <CellContainer>
              <VideoFeed />
            </CellContainer>
          </Cell>
          <Cell area="chat">
            <CellContainer>
              <Pane name={PRIMARY_PANE} />
            </CellContainer>
          </Cell>
        </Grid>
      </Container>
    );
  }
}

export default Medium;
