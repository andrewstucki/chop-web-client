// @flow
import React from 'react';
import ReactionsContainer from '../../src/reactions/reactionsContainer';
import { renderWithReduxAndTheme, defaultState } from '../testUtils';
import { fireEvent } from '@testing-library/react';
import reducer from '../../src/chop/dux';
import { removeReaction } from '../../src/feed/dux';
import type { ChopStateType } from '../../src/chop/dux';

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
    const state:ChopStateType = {
      ...defaultState,
      feed: {
        ...defaultState.feed,
        reactions: [
          {
            type: 'REACTION',
            id: reactionId,
            subscriber: {
              id: '12345',
              avatar: null,
              nickname: 'Kylo Ren',
              role: {
                label: '',
                permissions: [],
              },
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
