// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState, removeReaction } from '../../src/feed/dux';

import ReactionsContainer from '../../src/reactions/reactionsContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('Reaction tests', () => {
  test('Reaction Button click adds Reaction to state', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
          currentUser: {
            pubnubToken: '123456',
            name: 'Billy Bob',
            role: { label: '' },
          },
        },
      }
    );
    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <div>
          <ReactionsContainer />
        </div>   
      </Provider>
    );
    wrapper.find('button').first().simulate('click');
    expect(wrapper.find('ReactionsContainer').children().find('Reaction').length).toBe(1);
    expect(wrapper.find('Reaction').get(0).props.reactionId).toMatch(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/);
    wrapper.find('Reaction').first().simulate('animationEnd');
    expect(wrapper.find('ReactionsContainer').children().find('Reaction').length).toBe(0);
  });

  test('Remove Reaction removes a reaction from state', () => {
    const reactionId = expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/);
    const state = {
      feed: {
        ...defaultState,
        currentUser: {
          pubnubToken: '123456',
          name: 'Billy Bob',
          role: { label: '' },
        },
        reactions: [
          {
            type: 'REACTION',
            id: reactionId,
            user: {
              pubnubToken: '123456',
              name: 'Billy Bob',
              role: { label: '' },
            },
          },
        ],
      },
    };
    const { lastAction, ...result } = reducer(state, removeReaction(reactionId)).feed; // eslint-disable-line no-unused-vars

    expect(result).toEqual(
      {
        ...defaultState,
        currentUser: {
          pubnubToken: '123456',
          name: 'Billy Bob',
          role: { label: '' },
        },
        reactions: [],
      },
    );
  });
});