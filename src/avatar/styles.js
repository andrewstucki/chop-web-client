import styled from 'styled-components';
import type { AvatarSizeType } from './index';

type IconPropsType = {
  size: AvatarSizeType,
};

const getIconSize = (props:IconPropsType):string => {
  switch (props.size) {
    case 'small':
      return '24px';
    case 'medium':
      return '36px';
    case 'large':
      return '64px';
    case 'xlarge':
      return '80px';
  }
};

const getFontSize = (props:IconPropsType):string => {
  switch (props.size) {
    case 'small':
      return '0.65rem';
    case 'medium':
      return '1rem';
    case 'large':
      return '1.6rem';
    case 'xlarge':
      return '2rem';
  }
};

const Icon = styled.div`
  border-radius: 50%;
  height: ${(props:IconPropsType) => getIconSize(props)};
  width: ${(props:IconPropsType) => getIconSize(props)};
  line-height: ${(props:IconPropsType) => getIconSize(props)};
  color: ${props => props.theme.colors.background};
  font-size: ${(props:IconPropsType) => getFontSize(props)};
  text-align: center;
  font-weight: bold;
`;

const Image = styled.img`
  border-radius: 50%;
  height: ${(props:IconPropsType) => getIconSize(props)};
  width: ${(props:IconPropsType) => getIconSize(props)};
`;

export { Icon, Image };
