/* eslint-disable indent */
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  background-color: ${props => props.theme.colors.gray5};
  ${props => props.anchored ?
    css`
      width: 100%;
    `
    :
    css`
      ${MomentWrapper} {
        margin-left: 16px;
      }
    `
  }
`;

const ReleaseButton = styled.button`
  border: none;
  background-color: inherit;
  padding-right: 23.5px;
  padding-left: 22.5px;
  
  svg {
    width: 11px;
  }
`;

const Text = styled.div`
  line-height: 20px;
`;

const SubText = styled(Text)`
  color: ${props => props.theme.colors.gray50};
  font-size: 12.8px;
`;

const MomentWrapper = styled.div`
  margin-left: initial;
`;

export { Wrapper, ReleaseButton, Text, SubText, MomentWrapper };
