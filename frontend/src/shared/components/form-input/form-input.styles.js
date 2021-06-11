import styled, {css} from 'styled-components';

const ShrinkStyles = css`
  top: -10px;
  font-size: 14px;
`;

export const FormItem = styled.div`
  position: relative;
  margin: 25px 0;

  & > input {
    background: none;
    color: var(--black);
    font-size: 18px;
    padding: 10px 0 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid var(--black);
    margin: 25px 0;

    &:focus {
      outline: none;
    }

    &:focus ~ label {
      ${ShrinkStyles}
    }
  }

  & > label {
    color: var(--darkBlue);
    font-size: 18px;
    font-weight: 300;
    position: absolute;
    pointer-events: none;
    top: 10px;
    transition: 300ms ease all;

    &.shrink {
      ${ShrinkStyles}
    }
  }

  & > label:last-child {
    top: -10px;
  }

`;
