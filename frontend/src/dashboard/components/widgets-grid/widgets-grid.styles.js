import styled from 'styled-components';

export const WidgetsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div {
    margin-right: 80px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;
