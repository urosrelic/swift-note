import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useClickOutside } from '../../hooks/useClickOutside';

interface ModalProps {
  closeModalHandler: () => void;
  children: React.ReactNode;
  style?: {
    modalContainer?: React.CSSProperties;
    closeButton?: React.CSSProperties;
    closeButtonIcon?: React.CSSProperties;
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

const ModalContainer = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;

  textarea {
    border: none;
    outline: none;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  color: #000;
`;

const Modal = ({ closeModalHandler, children, style }: ModalProps) => {
  // * Hooks
  const domNode = useClickOutside<HTMLDivElement>(closeModalHandler);

  return (
    <ModalOverlay>
      <ModalContainer ref={domNode} style={style?.modalContainer}>
        {children}
        <CloseButton style={style?.closeButton} onClick={closeModalHandler}>
          <IconButton>
            <Close sx={{ ...style?.closeButtonIcon }} />
          </IconButton>
        </CloseButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
