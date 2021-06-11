import styled from 'styled-components';

export const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
  background: #ffffff;
  cursor: pointer;

  border: 1px solid #d6d8e7;
  border-radius: 16px;
`;

export const UserCardText = styled.div` && {
  font-weight: ${props => props.isUsername ? '500' : '400'};
  font-size: 24px;
  letter-spacing: 0.75px;
  color: #4E4B66;
  text-align: center;
  margin: 0 0 20px;
  
  &:last-child {
    margin: 0;
  }
}`
