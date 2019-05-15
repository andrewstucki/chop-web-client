// @flow
import React from 'react';
import { Dot } from './styles';
import { MediumDown } from '../../util/responsive';
import FilePlayer from 'react-player/lib/players/FilePlayer';
// $FlowFixMe - why won't these resolve?
import PopPopMp3 from '../../../assets/audio/pop_pop.mp3';
// $FlowFixMe - why won't these resolve?
import PopPopOgg from '../../../assets/audio/pop_pop.ogg';

type PipPropsType = {
  hasActions: boolean,
};

const PlayerConfig = {
  file: {
    forceAudio: true,
  },
};

const Pip = ({hasActions}:PipPropsType) => (
  <>
  <Dot hasActions={hasActions} />
  { hasActions &&
    <MediumDown>
      <FilePlayer
        playing
        url={[PopPopMp3, PopPopOgg]}
        config={PlayerConfig}
        width={0}
        height={0}
      />
    </MediumDown>
  }
  </>
);

export default Pip;
