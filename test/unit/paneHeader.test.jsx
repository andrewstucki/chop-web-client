// @flow
import React from 'react';
import sinon from 'sinon';
import { renderWithTheme } from '../testUtils';
import PaneHeader from '../../src/paneHeader';
import { CHAT_HEADER } from '../../src/paneHeader/chatHeader';
import { TAB_HEADER } from '../../src/paneHeader/tabHeader';
import { DIRECT_CHAT_HEADER } from '../../src/paneHeader/directChatHeader';
import { fireEvent } from 'react-testing-library';


describe('Pane Header tests', () => {
  test('It renders chat type', () => {
    const { getByTestId } = renderWithTheme(
      <PaneHeader
        type={CHAT_HEADER}
        data={{
          title: 'Host Chat',
          subtitle: 4,
        }}
      />
    );

    const paneHeader = getByTestId('chatHeader');
    expect(paneHeader).toBeTruthy();
  });

  test('It renders direct chat type', () => {
    const { getByTestId } = renderWithTheme(
      <PaneHeader
        type={DIRECT_CHAT_HEADER}
        data={{
          otherUsersName: 'user',
          leaveChannel: () => {},
        }}
      />
    );

    const paneHeader = getByTestId('directChatHeader');
    expect(paneHeader).toBeTruthy();
  });

  test('It renders tab type', () => {
    const { getByTestId } = renderWithTheme(
      <PaneHeader
        type={TAB_HEADER}
        data={{
          title: 'Host Info',
        }}
      />
    );

    const paneHeader = getByTestId('tabHeader');
    expect(paneHeader).toBeTruthy();
  });
});

describe('ChatHeader', () => {
  test('It renders the title', () => {
    const { getByTestId } = renderWithTheme(
      <PaneHeader
        type={CHAT_HEADER}
        data={{
          title: 'Host Chat',
          subtitle: 4,
        }}
      />
    );

    const paneHeaderTitle = getByTestId('chatHeader-title');
    expect(paneHeaderTitle.textContent).toEqual('Host Chat');
  });

  test('It renders the subtitle', () => {
    const { getByTestId } = renderWithTheme(
      <PaneHeader
        type={CHAT_HEADER}
        data={{
          title: 'Host Chat',
          subtitle: '4',
        }}
      />
    );

    const paneHeaderSubtitle = getByTestId('chatHeader-subtitle');
    expect(paneHeaderSubtitle.textContent).toEqual('4');
  });

  test('It does not render subtitle if one is not provided', () => {
    const { queryByTestId } = renderWithTheme(
      <PaneHeader
        type={CHAT_HEADER}
        data={{
          title: 'Host Chat',
        }}
      />
    );

    const paneHeaderSubtitle = queryByTestId('paneHeader-subtitle');
    expect(paneHeaderSubtitle).toBeFalsy();
  });
});

describe('DirectChatHeader', () => {
  test('It renders the other users name', () => {
    const { getByTestId } = renderWithTheme(
      <PaneHeader
        type={DIRECT_CHAT_HEADER}
        data={{
          otherUsersName: 'user',
          leaveChannel: () => {},
        }}
      />
    );

    const otherUsersName = getByTestId('otherUsersName');
    expect(otherUsersName.textContent).toEqual('user');
  });

  test('You can leave the channel', () => {
    const leaveChannel = sinon.spy();
    const { getByTestId } = renderWithTheme(
      <PaneHeader
        type={DIRECT_CHAT_HEADER}
        data={{
          otherUsersName: 'user',
          leaveChannel,
        }}
      />
    );

    fireEvent.click(getByTestId('leave'));
    expect(leaveChannel.calledOnce).toBeTruthy();
  });
});

describe('TabHeader', () => {
  test('It has a title', () => {
    const { getByTestId } = renderWithTheme(
      <PaneHeader
        type={TAB_HEADER}
        data={{
          title: 'Host Info',
        }}
      />
    );

    const title = getByTestId('tabHeader-title');
    expect(title.textContent).toEqual('Host Info');
  });
});
