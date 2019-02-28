// @flow
import Adapter from 'enzyme-adapter-react-16';
import Button, {
  BUTTON_LARGE,
  BUTTON_MEDIUM,
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  BUTTON_SMALL, BUTTON_XLARGE,
  BUTTON_XSMALL,
} from '../../../src/components/button';
import StyledButton from '../../../src/components/button/styles';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import 'jest-styled-components';
import { theme } from '../../../src/styles';
import { mountWithTheme } from '../../testUtils';

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  test('It has correct text', () => {
    const wrapper = mountWithTheme(
      <Button
        onClick={() => {
        }}
      >
        Maranatha
      </Button>
    );
    expect(wrapper.text()).toEqual('Maranatha');
  });

  test('It is clickable', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mountWithTheme(
      <Button
        onClick={onButtonClick}
      >Love</Button>);
    wrapper.find('button').simulate('click');
    expect(onButtonClick.calledOnce).toEqual(true);
  });

  test('It has a default type', () => {
    const wrapper = mountWithTheme(
      <Button
        onClick={() => {}}
      >Click Me</Button>
    );
    expect(wrapper.find(StyledButton).prop('variant')).toEqual(BUTTON_PRIMARY);
  });

  test('It has a default size', () => {
    const wrapper = mountWithTheme(
      <Button
        onClick={() => {}}
      >Click Me</Button>
    );
    expect(wrapper.find(StyledButton).prop('size')).toEqual(BUTTON_MEDIUM);
  });

  test('It has a primary variant', () => {
    const wrapper = mountWithTheme(
      <Button
        onClick={() => {}}
        variant={BUTTON_PRIMARY}
      >Click Me</Button>
    );
    // $FlowFixMe
    expect(wrapper.find(Button)).toHaveStyleRule('background-color', theme.colors.primary);
  });

  test('It has secondary variant', () => {
    const wrapper = mountWithTheme(
      <Button
        onClick={() => {}}
        variant={BUTTON_SECONDARY}
      >Click Me</Button>
    );
    // $FlowFixMe
    expect(wrapper.find(Button)).toHaveStyleRule('background-color', theme.colors.background);
  });

  test('It has xsmall size', () => {
    const wrapper = mountWithTheme(
      <Button
        onClick={() => {}}
        size={BUTTON_XSMALL}
      >Click Me</Button>
    );
    // $FlowFixMe
    expect(wrapper.find(Button)).toHaveStyleRule('font-size', '10.72px');
  });

  test('It has small size', () => {
    const wrapper = mountWithTheme(
      <Button
        onClick={() => {}}
        size={BUTTON_SMALL}
      >Click Me</Button>
    );
    // $FlowFixMe
    expect(wrapper.find(Button)).toHaveStyleRule('font-size', '12.8px');
  });

  test('It has medium size', () => {
    const wrapper = mountWithTheme(
      <Button
        onClick={() => {}}
        size={BUTTON_MEDIUM}
      >Click Me</Button>
    );
    // $FlowFixMe
    expect(wrapper.find(Button)).toHaveStyleRule('font-size', '16px');
  });

  test('It has large size', () => {
    const wrapper = mountWithTheme(
      <Button
        onClick={() => {}}
        size={BUTTON_LARGE}
      >Click Me</Button>
    );
    // $FlowFixMe
    expect(wrapper.find(Button)).toHaveStyleRule('font-size', '20px');
  });

  test('It has xlarge size', () => {
    const wrapper = mountWithTheme(
      <Button
        onClick={() => {}}
        size={BUTTON_XLARGE}
      >Click Me</Button>
    );
    // $FlowFixMe
    expect(wrapper.find(Button)).toHaveStyleRule('font-size', '24.96px');
  });
});
