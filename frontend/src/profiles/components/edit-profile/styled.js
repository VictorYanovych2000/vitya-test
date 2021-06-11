import styled from "styled-components";

export const ModalButtonsWrapper = styled.div` && {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}`

export const ModalButton = styled.button` && {
  padding: 3px 40px;
  outline: 0;
  font-size: 24px;
  border: none;
  cursor: pointer;
  background: #EFF0F6;
  border-radius: 9px;
  transition: 0.5s;

  &:hover {
    background: #cecfe0;
    transition: 0.5s;
  }
}`
