import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 522px;
  margin: 0 auto;

  & > h1 {
    font-size: 48px;
    font-weight: 600;
    margin-bottom: 3rem;
  }

  & > form {
    width: 100%;
    max-width: 400px;
    margin: auto;
  }
`;
