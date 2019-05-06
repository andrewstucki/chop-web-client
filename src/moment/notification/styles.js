import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  line-height: 1.25;
  font-size: 13.44px;
  color: ${props => props.theme.colors.gray50};
`;

const Timestamp = styled.div`
  font-size: 10.72px;
  margin-top: 2px;
`;

const Text = styled.div`
  width: 100%;
  padding: ${props => props.isCompact ? '5px 8px 5px 0' : '8px 8px 8px 0'};
`;

const Icon = styled.span`
  line-height: 0;

  svg {
    width: 20px;
    padding: ${props => props.isCompact ? '5px 11px 5px 1px' : '8px 16px 8px 8px'};
  }
`;

export {
  Wrapper,
  Timestamp,
  Text,
  Icon,
};
