import styled from 'styled-components';

type IconPropsType = {
  large: boolean,
};

const Icon = styled.div`
  border-radius: 50%;
  height: ${(props:IconPropsType) => {
    if (props.large) {
      return '64px';
    } else if (props.small) {
      return '24px';
    } else {
      return '36px';
    }
  }};
  width: ${(props:IconPropsType) => {
    if (props.large) {
      return '64px';
    } else if (props.small) {
      return '24px';
    } else {
      return '36px';
    }
  }};
  line-height: ${(props:IconPropsType) => {
    if (props.large) {
      return '64px';
    } else if (props.small) {
      return '24px';
    } else {
      return '36px';
    }
  }};
  color: ${props => props.theme.colors.background};
  font-size: ${(props:IconPropsType) => {
    if (props.large) {
      return '1.6rem';
    } else if (props.small) {
      return '10.72px';
    } else {
      return '1rem';
    }
  }};
  text-align: center;
  font-weight: bold;
`;

export { Icon };
