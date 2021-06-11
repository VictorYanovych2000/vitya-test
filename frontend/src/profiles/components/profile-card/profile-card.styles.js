import styled from 'styled-components';

export const CustomProfileCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 0 70px;
  background: #ffffff;
  border: 1px solid #d6d8e7;
  box-sizing: border-box;
  border-radius: 16px;
  width: 100%;
  min-width: 320px;

  .action {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;
    width: 100%;
  }

  &:hover {
    .action {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

export const ProfileText = styled.div` && {
  font-weight: ${props => props.isName ? '500' : '400'};
  font-size: 24px;
  letter-spacing: 0.75px;
  color: #4E4B66;
  text-align: center;
  margin: 0 0 15px;
}`

export const ProfileCardActionButton = styled.button` && {
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0.75px;
  color: #4E4B66;
  border-top: 1px solid #D6D8E7;
  width: 100%;
  background: transparent;
  border-left: ${props => props.isEditButton ? '0' : '1px solid #D6D8E7'};
  border-bottom-left-radius: ${props => props.isEditButton ? '16px' : '0'};
  border-bottom-right-radius: ${props => props.isEditButton ? '0' : '16px'};
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  &:hover {
    color: #ffffff;
    background: ${props => props.isEditButton ? '#624AF2' : '#EB0055'};
  }
}`
