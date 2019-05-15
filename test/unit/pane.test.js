//@flow
import { createStore } from 'redux';
import reducer, { defaultState } from '../../src/chop/dux';
import { setPaneToChat } from '../../src/pane/content/chat/dux.js';
import { paneContentSelector } from '../../src/selectors/paneSelectors.js';

describe('Testing Pane and Pane Content', () => {
  test('Set and Get Content for Pane name', () => {
    const store = createStore(
      reducer,
      defaultState
    );

    store.dispatch(setPaneToChat('primary', 'Host'));

    expect(paneContentSelector(store.getState().feed, 'primary')).toEqual(
      {
        type: 'CHAT',
        content: {
          channelId: 'Host',
          animate: true,
        },
      }
    );
  });
});
