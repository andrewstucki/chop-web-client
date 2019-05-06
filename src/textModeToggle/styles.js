import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
  height: 24px;
`;

const ToggleWrapper = styled.div`
  position absolute;
  display: inline-block;
`;

const Toggle = styled.label`
  cursor: pointer;
  -webkit-transition: .3s;
  transition: .3s;
  width: 56px;
  height: 24px;
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colors.gray30};
  box-sizing: border-box;
  display: block;

  ::after {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    left: -.5px;
    top: 0px;
    background-color: ${props => props.theme.colors.background};
    border-radius: 19px;
    border: 1px solid ${props => props.theme.colors.gray30};
    -webkit-transition: .3s;
    transition: .3s;
  }
`;

const HiddenCheckbox = styled.input`
  visibility: hidden;
  position: absolute;
  left: -9999px;

  :checked + ${Toggle}::after {
    transform: translateX(32px);
  }
`;

const ToggleContent = styled.span`
  position: absolute;
  top: 2px;
  right: ${props => props.checked ? '28px' : '9px'};
  height: ${props => props.checked ? '20px' : '17px'};
  width: ${props => props.checked ? '20px' : '17px'};
  display: inline-block;
`;

export {
  ToggleWrapper,
  HiddenCheckbox,
  Toggle,
  Container,
  ToggleContent,
};