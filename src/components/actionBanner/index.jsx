// @flow
import React from 'react';
import { Wrapper, Action} from './styles';
import Actionable from '../Actionable';

type ActionBannerPropsType = {
  text: string,
  onClick: () => void,
  primary?: boolean,
};

const ActionBanner = (
  {
    text,
    onClick,
    primary,
  }: ActionBannerPropsType
) => (
  <Wrapper>
    <Actionable onClick={onClick} keepFocus={false}>
      <Action primary={primary}>
        {text}
      </Action>
    </Actionable>
  </Wrapper>
);

ActionBanner.whyDidYouRender = true;

export default React.memo < ActionBannerPropsType > (ActionBanner);
