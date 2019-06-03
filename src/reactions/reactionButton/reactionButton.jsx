// @flow
import React from 'react';
import type { SharedSubscriberType } from '../../subscriber/dux';

import HeartButton from '../../../assets/heart-button.svg';
import { Container, Button } from './styles';
import Actionable from '../../components/Actionable';

type ReactionButtonPropsType = {
  buttonClick: (currentSubscriber: SharedSubscriberType) => void,
  currentSubscriber: SharedSubscriberType
}

const ReactionButton = ({ buttonClick: _click, currentSubscriber }: ReactionButtonPropsType) => {
  const buttonClick = () => _click(currentSubscriber);

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
