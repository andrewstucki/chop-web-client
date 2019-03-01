import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  height: 64px;
  width: 64px;
  color: var(--backgroundColor);
  line-height: 31px;
  font-size: 25px;
  margin-bottom: 8px;
`;

const User = styled.div`
  color: var(--textColor);
  text-align: center;
  line-height: 25px;
  font-size: 20px;
`;

export { Wrapper, Avatar, User };
