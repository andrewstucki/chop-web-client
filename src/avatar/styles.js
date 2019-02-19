import styled from 'styled-components';

type IconPropsType = {
  large: boolean,
};

const Icon = styled.div`
  border-radius: 50%;
  height: ${(props:IconPropsType) => props.large ? '64px' : '40px'};
  width: ${(props:IconPropsType) => props.large ? '64px' : '40px'};
  line-height: ${(props:IconPropsType) => props.large ? '64px' : '40px'};
  color: ${props => props.theme.colors.background};
  font-size: ${(props:IconPropsType) => props.large ? '1.6rem' : '1rem'};
  text-align: center;
  font-weight: bold;
`;

export { Icon };
