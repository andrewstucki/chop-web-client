// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';
import 'jest-styled-components';
import ActionBanner from '../../../src/components/actionBanner';
import { Wrapper, Action } from '../../../src/components/actionBanner/styles';
import Actionable from '../../../src/components/Actionable';
import { mountWithTheme } from '../../testUtils';
import { theme } from '../../../src/styles';

Enzyme.configure({ adapter: new Adapter() });

describe('ActionBanner test', () => {
  test('Leave direct chat banner renders', () => {
    const onClick = sinon.spy();
    const wrapper = mountWithTheme(
      <ActionBanner
        text="Leave"
        onClick={onClick}
      />
    );

    expect(wrapper.find(Wrapper).exists()).toBeTruthy();
    expect(wrapper.find(Action).exists()).toBeTruthy();
    expect(wrapper.find(Action).at(0).text()).toEqual('Leave');
    // $FlowFixMe
    expect(wrapper.find(Action)).toHaveStyleRule('color', theme.colors.gray50);
    wrapper.find(Actionable).at(0).simulate('click');
    expect(onClick.calledOnce).toEqual(true);
  });

  test('Turns blue with primary prop', () => {
    const onClick = sinon.spy();
    const wrapper = mountWithTheme(
      <ActionBanner
        text="Leave"
        onClick={onClick}
        primary
      />
    );
    // $FlowFixMe
    expect(wrapper.find(Action)).toHaveStyleRule('color', theme.colors.primary);
  });
});
