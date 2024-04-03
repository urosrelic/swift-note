import React from 'react';
import styled from 'styled-components';
import { useClickOutside } from '../../hooks/useClickOutside';

interface ModalProps {
  closeModalHandler: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
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
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #000;
`;

const Modal = ({ closeModalHandler, children, style }: ModalProps) => {
  const domNode = useClickOutside<HTMLDivElement>(closeModalHandler);
  return (
    <ModalOverlay>
      <ModalContent ref={domNode} style={style}>
        {children}
        <CloseButton onClick={closeModalHandler}>
          <img src='/close.svg' alt='Close' />
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
