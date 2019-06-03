// @flow
import React from 'react';

import {
  Toggle,
  ToggleWrapper,
  HiddenCheckbox,
  Container,
  ToggleContent,
} from './styles';
import { COMFORTABLE, COMPACT } from './dux';
import type { TextModeType } from './dux';
import Text from '../../assets/Aa.svg';

type TextModeSelectorPropsType = {
  toggleTextMode: (subscriberId: string, mode: TextModeType) => void,
  mode: TextModeType,
  subscriberId: string,
};

const TextModeSelector = (
  {
    toggleTextMode,
    mode,
    subscriberId,
  }: TextModeSelectorPropsType
) => {
  const checked = mode === COMFORTABLE ? true : false;
  return (
    <Container>
      <ToggleWrapper>
        <HiddenCheckbox 
          type="checkbox"
          checked={checked}
          id='checkbox'
          onChange={() => (
            toggleTextMode(subscriberId, mode === COMFORTABLE ? COMPACT : COMFORTABLE)
          )}
        />
        <Toggle htmlFor='checkbox'>
          <ToggleContent checked={checked} dangerouslySetInnerHTML={{ __html: Text }}/>
        </Toggle>
      </ToggleWrapper>
    </Container>
  );
};

export default React.memo < TextModeSelectorPropsType > (TextModeSelector);