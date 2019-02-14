import React, { Component } from 'react';
import TimelineLite from 'gsap/TimelineLite';
import { CSSPlugin, Power3 } from 'gsap/all';
import { getComponentDisplayName } from '../util';

// Needed so plugins are not tree shaken
const plugins = [ CSSPlugin ]; // eslint-disable-line no-unused-vars

type TransitionType = (enter: React.Node, leave: React.Node, () => {}) => void;

type WithSlideTransitionsType = {
  syncTransitionRight: TransitionType,
  syncTransitionLeft: TransitionType,
};

function withSlideTransitions (WrappedComponent) {
  return typeof WrappedComponent === 'function'
    ? makeWithSlideTransitions(arguments[0])
    : WrappedComponent => makeWithSlideTransitions(WrappedComponent, arguments[0]);
}

const makeWithSlideTransitions = (WrappedComponent, options = { duration: 0.4 }) => {
  class WithSlideTransitions extends Component {
    syncTransitionRight (enter, leave, callback) {
      if (enter && leave) {
        const { duration } = options;
        const tl = new TimelineLite({ onComplete: callback });
        tl.fromTo(enter, duration, { transform: 'translate3d(-100%, 0, 0)' }, { transform: 'translate3d(0, 0, 0)', ease: Power3.easeInOut } )
          .fromTo(leave, duration, { transform: 'translate3d(0, 0, 0)' }, { transform: 'translate3d(100%, 0, 0)', ease: Power3.easeInOut }, `-=${duration}` );
      }
    }

    syncTransitionLeft (enter, leave, callback) {
      if (enter && leave) {
        const { duration } = options;
        const tl = new TimelineLite({ onComplete: callback });
        tl.fromTo(enter, duration, { transform: 'translate3d(100%, 0, 0)' }, { transform: 'translate3d(0, 0, 0)', ease: Power3.easeInOut } )
          .fromTo(leave, duration, { transform: 'translate3d(0, 0, 0)' }, {transform: 'translate3d(-100%, 0, 0)', ease: Power3.easeInOut}, `-=${duration}` );
      }
    }

    render () {
      return <WrappedComponent {...this.props}
        syncTransitionRight={this.syncTransitionRight}
        syncTransitionLeft={this.syncTransitionLeft}
      />;
    }
  }
  WithSlideTransitions.displayName = `WithSlideTransitions(${getComponentDisplayName(WrappedComponent)})`;
  return WithSlideTransitions;
};

export {
  withSlideTransitions,
};

export type {
  WithSlideTransitionsType,
};
