// @flow
import React from 'react';
import Actionable from '../../Actionable';
import { ActionButton, CloseButton } from './styles';

const MESSAGE_ACTION = 'MESSAGE_ACTION';
const CLOSE_TRAY = 'CLOSE_TRAY';

type TrayButtonProps = {
  type?: typeof MESSAGE_ACTION | typeof CLOSE_TRAY,
  icon: any,
  color: string,
  text: string,
  onClick: any,
};

const TrayButton = ({ type = MESSAGE_ACTION, icon, color, text, onClick }:TrayButtonProps) => {
  const Button = type === CLOSE_TRAY ? CloseButton : ActionButton;

  return (
    <Actionable onClick={onClick} keepFocus={true}>
      <Button color={color}>
        <span
          dangerouslySetInnerHTML={{__html: icon}}
        />
        <div style={{display: text !== 'Close' ? 'block' : 'none'}}>{text}</div>
      </Button>
    </Actionable>
  );
};

export default React.memo < TrayButtonProps > (TrayButton);
