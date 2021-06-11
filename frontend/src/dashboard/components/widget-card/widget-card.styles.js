import styled from 'styled-components';

export const WidgetCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 75px;

  background: #ffffff;

  border: 1px solid #d6d8e7;
  box-sizing: border-box;
  border-radius: 32px;

  h3 {
    font-size: 36px;
    font-weight: 400;
    margin: 0 0 35px;
  }

  span {
    font-size: 48px;
    font-weight: 600;
  }
`;
