import styled from 'styled-components';

const TextWrapper = styled.span`
  color: white;
  background-color: ${props => props.theme.colors.gray50};
  border-radius: 12px;
  font-size: 10.24px;
  text-align: center;
  line-height: 13px;
  padding: 0 5px 0;
`;

const LabelWrapper = styled.div`
  display: inline-block;
  position: relative;
  bottom: 1px;
  left: 4px;
  margin-right: 3px;
`;

export {
  TextWrapper,
  LabelWrapper,
};
