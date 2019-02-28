import styled from 'styled-components';

const Wrapper = styled.div`
  padding-bottom: 16px;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid ${props => props.theme.colors.gray30};
  border-radius: .25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 0.1rem rgba(41,147,229,.25);
  }
`;

const Label = styled.label`
  display: inline-block;
  font-weight: 500;
  font-size: 0.85rem;
  width: 100%;
  margin-bottom: 2px;
`;

export {
  Wrapper,
  Input,
  Label,
};
