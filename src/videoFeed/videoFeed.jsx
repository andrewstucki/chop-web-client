// @flow
import React from 'react';
import type { SimulatedLivePlayerPropsType } from './dux';
import IframeEmbedPlayer from './players/iframeEmbedPlayer';
import SimulatedLivePlayer from './players/simulatedLivePlayer';
import OfflinePlayer from './players/offlinePlayer';
import VideoHeader from './videoHeader';
import { Container, OuterWrapper, InnerWrapper } from './styles';
import { MediumUp } from '../util/responsive';


type VideoFeedProps = {
  type: string,
  url: string,
  isVideoHidden: boolean,
  // $FlowFixMe
  Player?: React.ComponentType<SimulatedLivePlayerPropsType>,
  startAt: number,
  onPause: () => void,
  onPlay: () => void,
  isVideoPlaying: boolean,
  isMobileDevice: boolean,
};

const VideoFeed = ({ type, Player, url, isVideoHidden, isMobileDevice, onPlay, onPause, startAt, isVideoPlaying }:VideoFeedProps) => {
  if (!url) {
    return null;
  }

  return (
    <>
      <MediumUp>
        <VideoHeader />
      </MediumUp>
      <Container>
        <OuterWrapper>
          <InnerWrapper data-testid='videoFeed' hidden={isVideoHidden}>
            { url !== '' && type === 'simulated' &&
              <SimulatedLivePlayer
                Player={Player}
                url={url}
                startAt={startAt}
                onPlay={onPlay}
                onPause={onPause}
                isMobileDevice={isMobileDevice}
                isVideoPlaying={isVideoPlaying}
              />
            }

            { url !== '' && type === 'live' &&
              <IframeEmbedPlayer
                url={url}
              />
            }

            { url !== '' && type === 'offline' &&
              <OfflinePlayer
                url={url}
                Player={Player}/>
            }
          </InnerWrapper>
        </OuterWrapper>
      </Container>
    </>
  );
};

export default React.memo < VideoFeedProps > (VideoFeed);
