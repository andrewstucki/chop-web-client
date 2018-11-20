// @flow
import Adapter from 'enzyme-adapter-react-16';
import Errors from '../../src/errors';
import Enzyme from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

Enzyme.configure({ adapter: new Adapter() });

test('Errors render.', () => {
  const store = createStore(() => (
    {
      feed: {
        errors: [
          {
            id: 1,
            message: 'You do not have access to this area of the application.',
          },
          {
            id: 2,
            message: 'Email address is required.',
          },
        ],
      },
    }
  ));

  const wrapper = Enzyme.mount(
    <Provider store={store}>
      <div>
        <Errors />
      </div>   
    </Provider>
  );

  expect(wrapper.find('p')).toHaveLength(2);
  expect(wrapper.find('p').at(0).text()).toEqual('You do not have access to this area of the application.');
  expect(wrapper.find('p').at(1).text()).toEqual('Email address is required.');
});
