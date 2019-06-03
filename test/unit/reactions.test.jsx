// @flow
import React from 'react';
import ReactionsContainer from '../../src/reactions/reactionsContainer';
import { renderWithReduxAndTheme, defaultState } from '../testUtils';
import { fireEvent } from 'react-testing-library';
import reducer from '../../src/chop/dux';
import { removeReaction } from '../../src/feed/dux';

describe('Reaction tests', () => {
  test('Reaction Button click adds Reaction to state', () => {
    const state = {
      ...defaultState,
      subscriber: {
        ...defaultState.subscriber,
        currentSubscriber: {
          nickname: 'Billy Bob',
          role: { label: '' },
        },
      },
    };

    const { getByTestId, getAllByTestId } = renderWithReduxAndTheme(
      <ReactionsContainer />,
      state
    );

    fireEvent.click(getByTestId('reactionButton'));
    fireEvent.click(getByTestId('reactionButton'));
    expect(getAllByTestId('reaction').length).toEqual(2);
  });

  test('Remove Reaction removes a reaction from state', () => {
    const reactionId = expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/);
    const state = {
      ...defaultState,
      subscriber: {
        ...defaultState.subscriber,
        currentSubscriber: {
          nickname: 'Billy Bob',
          role: { label: '' },
        },
      },
      feed: {
        ...defaultState.feed,
        reactions: [
          {
            type: 'REACTION',
            id: reactionId,
            subscriber: {
              nickname: 'Billy Bob',
              role: { label: '' },
            },
          },
        ],
      },
    };
    const { lastAction:_remove, ...result } = reducer(state, removeReaction(reactionId)).feed;

    expect(result).toEqual(
      {
        ...defaultState.feed,
        reactions: [],
      }
    );
  });
});
