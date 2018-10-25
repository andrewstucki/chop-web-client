import React from 'react';
import Reaction from '../reaction';
import ReactionButton from '../reactionButton';
import style from './style.css';

import type { ReactionType } from '../reactionButton/dux';

type ReactionsContainerProps = {
  reactions: Array<ReactionType>,
};

const ReactionsContainer = ({reactions}: ReactionsContainerProps) => (
  <div className={style.container}>
    { reactions.map(reaction =>
      <Reaction key={reaction.id} reactionId={reaction.id}/>
    )}
    <ReactionButton />
  </div>
);

export default ReactionsContainer;