// @flow
import serviceActor from '../../src/io/serviceActor';
import { mockMuteUser } from '../../src/io/graphQL';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';
import Message from '../../src/moment/message';
import actorMiddleware from '../../src/middleware/actor-middleware';
import '../../src/io/location';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { promisifyMiddleware } from '../testUtils';

jest.mock('../../src/io/graphQL');
jest.mock('../../src/io/location');

Enzyme.configure({ adapter: new Adapter() });

describe('Test mute user', () => {
  test('Mute user', async () => {
    const actorMiddlewareApplied = actorMiddleware(
      serviceActor,
    );

    global.document.cookie  = 'legacy_token=12345; ';

    const message = {
      type: 'MESSAGE',
      id: '123456',
      lang: 'EN',
      text: 'text',
      user: {
        pubnubToken: '123456',
        name: 'name',
        role: { label: '' },
      },
      messageTrayOpen: true,
      closeTrayButtonRendered: true,
    };

    const middlewareList = [promisifyMiddleware, actorMiddlewareApplied];

    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
          channels: {
            test: {
              name: 'test',
              id: 'test',
              moments: [message],
              anchorMoments: [],
            },
          },
          panes: {
            primary: {
              channelId: 'test',
              type: 'EVENT',
            },
          },
        },
      },
      applyMiddleware(...middlewareList)
    );

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <div>
          <Message message={message} />
        </div>   
      </Provider>
    );

    return store.dispatch({type: REHYDRATE}).then(() => {
      wrapper.find('button.muteButton').simulate('click');
      expect(mockMuteUser).toHaveBeenCalledTimes(1);
    });
  });
});
