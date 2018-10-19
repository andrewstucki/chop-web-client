// @flow
import serviceActor from '../../src/io/serviceActor';
import { mockAuthenticate, mockMuteUser } from '../../src/io/graphQL';
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

    await await store.dispatch({type:'INIT'});

    wrapper.find('button.muteButton').simulate('click');

    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockAuthenticate).toHaveBeenCalledWith(
      '12345',
      'digerati.churchonline.org');
    expect(mockMuteUser).toHaveBeenCalledTimes(1);
  });
});
