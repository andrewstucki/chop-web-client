// @flow
import React, { type Node, useState } from 'react';
import ReactDOM from 'react-dom';
import InfoIcon from '../../icons/info';
import IconButton from '../iconButton';
import { Manager, Reference, Popper, type Placement } from 'react-popper';
import { getOrCreateElement } from '../../util';
import { PopperWraper } from './styles';

type TooltipProps = {
  content: Node,
  placement?: Placement,
};

const Tooltip = ({ content, placement = 'top' }:TooltipProps) => {
  const tooltip = getOrCreateElement('tooltip');
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const toggleShowTooltip = () => setShowTooltip(!showTooltip);
  const handleSetShowTooltip = () => setShowTooltip(true);
  const handleSetHideTooltip = () => setShowTooltip(false);

  if (tooltip) {
    return (
      <Manager>
        <Reference>
          {({ ref:referenceRef }) => (
            <IconButton
              id='tooltip-icon'
              size={17}
              // $FlowFixMe
              ref={referenceRef}
              onMouseEnter={handleSetShowTooltip}
              onMouseLeave={handleSetHideTooltip}
              onClick={toggleShowTooltip}
            >
              <InfoIcon />
            </IconButton>
          )}
        </Reference>
        {showTooltip && ReactDOM.createPortal(
          <Popper placement={placement}>
            {({ placement, ref:popperRef, style }) => (
              // $FlowFixMe
              <PopperWraper ref={popperRef} style={style} data-placement={placement} data-testid='tooltip-content'>
                { content }
              </PopperWraper>
            )}
          </Popper>,
          tooltip
        )}
      </Manager>
    );
  } else {
    return null;
  }
};

export default Tooltip;
