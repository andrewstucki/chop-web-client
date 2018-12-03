// @flow
import { dataLayerEventDefinition } from '../../../src/middleware/tagmanager-middleware';
import { defaultState as defaultFeedState } from '../../../src/feed/dux';
import { createEvents } from 'redux-beacon';
import TagManager from 'react-gtm-module';

describe('Tag Manager Middleware', () => {
  test('Init Event Definition loads GTM script', () => {
    expect.assertions(2);

    global.GTM = {gtmId: 'XXXXXXX'};
    TagManager.initialize(global.GTM);

    expect(window.dataLayer).toBeTruthy();
    expect(window.dataLayer[0]).toMatchObject({
      'gtm.start': expect.any(Number),
      event: expect.stringMatching('gtm.js'),
    });
  });

  test('Data Layer Definition adds events to GTM', () => {
    expect.assertions(2);
    const action = {
      type: 'TOGGLE_CHAT_FOCUS',
      payload: { dummy: 'data' },
    };

    const state = { feed: defaultFeedState, io: {} };

    const events = createEvents([dataLayerEventDefinition], state, action, state);

    expect(events).toBeTruthy();
    
    const expected = {
      hitType: 'event',
      event: action.type,
      payload: action,
      organization: state.feed.organization,
    };

    expect(events).toEqual(
      expect.arrayContaining([expected]),
    );
  });
});