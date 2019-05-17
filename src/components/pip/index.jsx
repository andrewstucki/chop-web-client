// @flow
import React from 'react';
import AudioPlayer from '../audioPlayer';
import { Dot } from './styles';
import { MediumDown } from '../../util/responsive';
// $FlowFixMe - why won't these resolve?
import PopPopMp3 from '../../../assets/audio/pop_pop.mp3';
// $FlowFixMe - why won't these resolve?
import PopPopOgg from '../../../assets/audio/pop_pop.ogg';

type PipPropsType = {
  hasActions: boolean,
};

const Pip = ({hasActions}:PipPropsType) => (
  <>
  <Dot hasActions={hasActions} />
  { hasActions &&
    <MediumDown>
      <AudioPlayer
        url={[PopPopMp3, PopPopOgg]}
      />
    </MediumDown>
  }
  </>
);

export default Pip;
