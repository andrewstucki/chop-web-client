import React, { Component } from 'react';
import styles from './style.css';

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
      <div
        onAnimationEnd={this.removeReaction}
        className={styles.animate}
        style={heartStyle}
        ref={this.reactionRef}
        dangerouslySetInnerHTML={{ __html: Heart }} 
      ></div>
    );
  }
}

export default Reaction;