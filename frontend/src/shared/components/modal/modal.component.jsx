import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Modal = styled.div`
  max-width: 5000px;
  background-color: white;
  position: fixed;
  top: 75px;
  border-radius: 16px;
  z-index: 5;
  max-height: calc(100% - 200px);
  left: calc(50% - 250px);
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    left: 0px;
    margin: 0px 10px;
  }
`;
// edit clicker
export const ModalContent = styled.div`
  overflow: auto;
  min-width: 400px;
  min-height: 400px;
  padding: 50px 90px;
`;

export const ModalFooter = styled.div`
  box-shadow: 0px -2px 10px 0px grey;
  height: 60px;
  display: flex;
  justify-content: center;
`;

const ModalShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.6;
  z-index: 4;
`;

function ModalContainer({ setOpen, children }) {
  return ReactDOM.createPortal(
    <>
      <ModalShadow onClick={() => setOpen(false)} />
      <Modal>

        <ModalContent>{children}</ModalContent>
      </Modal>
    </>,
    document.getElementById('modal-root')
  );
}


export default ModalContainer;
