// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import MessageTray from '../../../src/components/messageTray';
import { mountWithTheme } from '../../testUtils';

Enzyme.configure({ adapter: new Adapter() });

describe('MessageTray tests', () => {
  test('MessageTray has buttons', () => {
    const muteUser = sinon.spy();
    const wrapper = mountWithTheme(
      <MessageTray
        deleteMessage={() => {}}
        muteUser={muteUser}
        directChat={() => {}}
        closeTray={() => {}}
      />
    );
    expect(wrapper.find('button').length).toEqual(4);
  });

  test('Can click delete', () => {
    const deleteMessage = sinon.spy();
    const wrapper = mountWithTheme(
      <MessageTray
        deleteMessage={deleteMessage}
        muteUser={() => {}}
        directChat={() => {}}
        closeTray={() => {}}
      />
    );

    wrapper.find('[data-test="deleteButton"]').first().simulate('click');
    expect(deleteMessage.calledOnce).toEqual(true);
  });

  test('Can click delete', () => {
    const muteUser = sinon.spy();
    const wrapper = mountWithTheme(
      <MessageTray
        deleteMessage={() => {}}
        muteUser={muteUser}
        directChat={() => {}}
        closeTray={() => {}}
      />
    );

    wrapper.find('[data-test="muteButton"]').first().simulate('click');
    expect(muteUser.calledOnce).toEqual(true);
  });

  test('Can click direct chat', () => {
    const directChat = sinon.spy();
    const wrapper = mountWithTheme(
      <MessageTray
        deleteMessage={() => {}}
        muteUser={() => {}}
        directChat={directChat}
        closeTray={() => {}}
      />
    );

    wrapper.find('[data-test="directChatButton"]').first().simulate('click');
    expect(directChat.calledOnce).toEqual(true);
  });

  test('Can click close', () => {
    const closeTray = sinon.spy();
    const wrapper = mountWithTheme(
      <MessageTray
        deleteMessage={() => {}}
        muteUser={() => {}}
        directChat={() => {}}
        closeTray={closeTray}
      />
    );

    wrapper.find('[data-test="closeButton"]').first().simulate('click');
    expect(closeTray.calledOnce).toEqual(true);
  });
});
