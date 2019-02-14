import styled from 'styled-components';
import Label from '../../components/label/styles';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  margin: 0.25rem 0;
  cursor: ${props => props.comingSoon ? 'not-allowed' : 'pointer'};
  width: 100%;
  color: ${props => getGray(props)};
  
  ${props => props.comingSoon && 'pointer-events: none;'}
  
  ${Label} {
    background-color: ${props => props.theme.colors.gray30};
  }
`;

const Icon = styled.span`
  width: 20px;
  height: 20px;
`;

const StrokeIcon = styled(Icon)`
  svg path {
    stroke: ${props => getGray(props)};
  }
`;

const FillIcon = styled(Icon)`
  svg path {
    fill: ${props => getGray(props)}
`;

const Title = styled.div`
  flex: 1;
  text-transform: uppercase;
  font-weight: 500;
  line-height: 20px;
  margin-left: 1rem;
`;

const getGray = props => {
  if (props.active) {
    return props.theme.colors.gray100;
  } else if (props.comingSoon) {
    return props.theme.colors.gray30;
  } else {
    return props.theme.colors.gray50;
  }
};

export { Wrapper, Title, StrokeIcon, FillIcon };
