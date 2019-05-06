// @flow
import React from 'react';
import Actionable from '../../Actionable';
import { ActionButton } from './styles';

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
  const textStyle = { display: type === CLOSE_TRAY ? 'none' : 'block' };
  return (
    <Actionable onClick={onClick} keepFocus={true}>
      <ActionButton color={color}>
        <span
          dangerouslySetInnerHTML={{__html: icon}}
        />
        <div style={textStyle}>{text}</div>
      </ActionButton>
    </Actionable>
  );
};

export default React.memo < TrayButtonProps > (TrayButton);
export { CLOSE_TRAY };
