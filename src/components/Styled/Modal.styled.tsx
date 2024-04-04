import React from 'react';
import styled from 'styled-components';
import { useClickOutside } from '../../hooks/useClickOutside';

interface ModalProps {
  closeModalHandler: () => void;
  children: React.ReactNode;
  style?: {
    modalContainer?: React.CSSProperties;
    closeButton?: React.CSSProperties;
  };
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 1rem;
  cursor: pointer;
  color: #000;
`;

const Modal = ({ closeModalHandler, children, style }: ModalProps) => {
  const domNode = useClickOutside<HTMLDivElement>(closeModalHandler);
  return (
    <ModalOverlay>
      <ModalContent ref={domNode} style={style?.modalContainer}>
        {children}
        <CloseButton style={style?.closeButton} onClick={closeModalHandler}>
          <img src='/close.svg' alt='Close' />
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
