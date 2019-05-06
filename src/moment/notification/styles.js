import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  line-height: 1.25;
  font-size: 13.44px;
  color: ${props => props.theme.colors.gray50};
`;

const Icon = styled.span`
  line-height: 0;
  
  svg {
    width: 20px;
    padding: 8px 18px 8px 10px;
  }
`;

const Timestamp = styled.div`
  font-size: 10.72px;
  margin-top: 2px;
`;

const Text = styled.div`
  width: 100%;
  padding: 8px 8px 8px 0;
`;

export { Wrapper, Icon, Timestamp, Text };
