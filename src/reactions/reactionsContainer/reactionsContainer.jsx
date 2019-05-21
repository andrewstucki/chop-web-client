// @flow
import React from 'react';
import Reaction from '../reaction';
import ReactionButton from '../reactionButton';

import type { ReactionType } from '../reactionButton/dux';

type ReactionsContainerProps = {
  reactions: Array<ReactionType>,
};

const ReactionsContainer = ({reactions}: ReactionsContainerProps) => (
  <div
    data-testid={'reactionContainer'}
    css={`
      position: relative;
      z-index: 1;
  `}>
    { reactions.map(reaction =>
      <Reaction key={reaction.id} reactionId={reaction.id}/>
    )}
    <ReactionButton />
  </div>
);

export default React.memo < ReactionsContainerProps > (ReactionsContainer);
