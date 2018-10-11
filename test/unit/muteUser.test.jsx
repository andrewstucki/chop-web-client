// @flow
import GraphQlActor from '../../src/io/graph';
import { mockFetch, mockGraph } from 'graphql.js';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';
import Message from '../../src/moment/message';
import actorMiddleware from '../../src/middleware/actor-middleware';
import accessToken from './io/access-token.json';

jest.mock('graphql.js');

Enzyme.configure({ adapter: new Adapter() });

describe('Test mute user', () => {
  test('Mute user', async () => {
    const actorMiddlewareApplied = actorMiddleware(
      GraphQlActor,
    );
    global.document.cookie  = 'legacy_token=12345; ';
    mockFetch.mockResolvedValueOnce(accessToken);
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
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      },
      applyMiddleware(actorMiddlewareApplied)
    );
    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <div>
          <Message message={message} />
        </div>   
      </Provider>
    );
    await store.dispatch({type:'GET_ACCESS_TOKEN'});
    wrapper.find('button.muteButton').simulate('click');
    expect(mockGraph).toHaveBeenCalledTimes(3);
    expect(mockGraph.mock.calls[2][0]).toBe(
      ` 
        mutation muteUser($pubnubToken: String!) {
          muteUser(pubnub_token: $pubnubToken) {
            success
          }
        }
      `
    );
  });
});