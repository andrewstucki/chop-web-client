import React, { Component } from 'react';
import { Wrapper } from './styles';

import Heart from '../../../assets/heart.svg';

type ReactionProps = {
  reactionId: string,
  removeReaction: (id: string) => void
};

class Reaction extends Component<ReactionProps> {
  constructor (props: ReactionProps) {
    super(props);
    this.reactionRef = React.createRef();
    this.removeReaction = this.removeReaction.bind(this);
  }

  componentWillUnmount (): void {
    this.removeReaction();
  }

  removeReaction () {
    this.props.removeReaction(this.props.reactionId);
  }

  render () {
    const randWidth = Math.floor(Math.random() * 8) + 18;
    const randRight = Math.floor(Math.random() * 20) + 10;
    const randTop = Math.floor(Math.random() * 11) + 75;
    const heartStyle = {
      width:randWidth + 'px',
      height:(randWidth - 2) + 'px',
      position: 'absolute',
      top: '-' + randTop + 'px',
      right: randRight + 'px',
    };

    return (
      <Wrapper
        data-testid={'reaction'}
        onAnimationEnd={this.removeReaction}
        style={heartStyle}
        ref={this.reactionRef}
        dangerouslySetInnerHTML={{ __html: Heart }}
      ></Wrapper>
    );
  }
}

export default Reaction;
