import styled from 'styled-components';

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserInfoText = styled.div` && {
  font-size: ${props => props.isRole ? '24px' : '32px'};
  line-height: 48px;
  letter-spacing: 1px;
  color: #14142B;
  text-align: center;
}`
