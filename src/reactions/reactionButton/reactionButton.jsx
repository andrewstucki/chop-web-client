// @flow
import React from 'react';
import type { SharedUserType } from '../../users/dux';

import HeartButton from '../../../assets/heart-button.svg';
import { Container, Button } from './styles';
import Actionable from '../../components/Actionable';

type ReactionButtonPropsType = {
  buttonClick: (currentUser: SharedUserType) => void,
  currentUser: SharedUserType
}

const ReactionButton = ({ buttonClick: _click, currentUser }: ReactionButtonPropsType) => {
  const buttonClick = () => _click(currentUser);

  return (
    <Container>
      <Actionable onClick={buttonClick} keepFocus={true}>
        <Button
          data-testid={'reactionButton'}
          dangerouslySetInnerHTML={{ __html: HeartButton }}
        />
      </Actionable>
    </Container>
  );
};

export default React.memo < ReactionButtonPropsType > (ReactionButton);
