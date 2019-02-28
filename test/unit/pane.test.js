//@flow
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { setPaneToChat } from '../../src/pane/content/chat/dux.js';
import { paneContentSelector } from '../../src/selectors/paneSelectors.js';
import { defaultState } from '../../src/feed/dux';

describe('Testing Pane and Pane Content', () => {
  test('Set and Get Content for Pane name', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );

    store.dispatch(setPaneToChat('primary', 'Host'));

    expect(paneContentSelector(store.getState().feed, 'primary')).toEqual(
      {
        type: 'CHAT',
        content: {
          channelId: 'Host',
        },
      }
    );
  });
});
