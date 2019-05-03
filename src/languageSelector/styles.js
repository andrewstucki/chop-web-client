import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 32px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  
  &:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${props => props.theme.colors.gray50};
    right: 8px;
    position: absolute;
    pointer-events: none;
  }
`;

const GlobeContainer = styled.div`
  height: 20px;
  width: 20px;
  position: absolute;
  left: 10px;
  pointer-events: none;
`;

const LanguageSelect = styled.select`
  padding-left: 34px;
  padding-right: 20px;
  margin: 0 auto;
  border: 1px solid ${props => props.theme.colors.gray30};
  font-size: 16px;
  line-height: 20px;
  background-color: ${props => props.theme.colors.background};
  -webkit-appearance: none;
  border-radius: 16px;
  display: inline-block;
  color: ${props => props.theme.colors.textColor};
  height: 32px;
`;

export { Wrapper, DropdownContainer, GlobeContainer, LanguageSelect };
