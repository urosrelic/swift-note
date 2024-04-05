import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useClickOutside } from '../../hooks/useClickOutside';

interface DialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  style?: {
    dialog?: React.CSSProperties;
    dialogContainer?: React.CSSProperties;
    dialogButton?: React.CSSProperties;
    closeButton?: React.CSSProperties;
    closeButtonIcon?: React.CSSProperties;
  };
  children: React.ReactNode;
}

const DialogContainer = styled.div<{
  style?: React.CSSProperties;
}>`
  /* Default styles */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DialogButton = styled.div<{
  style?: React.CSSProperties;
}>`
  width: 90%;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  cursor: pointer;
  background-color: var(--tertiary-color);
  border-radius: 5px;
  color: var(--secondary-color);

  img {
    width: 25px;
    margin-right: 10px;
  }
`;

const StyledDialog = styled.div<{
  style?: React.CSSProperties;
  openDialog: boolean;
}>`
  /* Default styles */
  width: calc(100% - 2rem);
  height: auto;
  position: absolute;
  top: calc(100% - 25px);
  right: 0;
  padding: 1rem;
  margin: 1rem;
  background-color: var(--quaternary-color);
  border-radius: 5px;
  z-index: 1;
  color: var(--secondary-color);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: all 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: all 0.3s ease;
  }

  @media only screen and (min-width: 500px) {
    width: 400px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
`;

const Dialog: React.FC<DialogProps> = ({
  openDialog,
  setOpenDialog,
  style,
  children,
}) => {
  const domNode = useClickOutside<HTMLDivElement>(() => setOpenDialog(false));

  const dialogClassName = openDialog ? 'show' : '';

  return (
    <StyledDialog
      className={`dialog ${dialogClassName} `}
      ref={domNode}
      style={style?.dialog}
      openDialog={openDialog}
    >
      <DialogContainer style={style?.dialogContainer}>
        {children}
      </DialogContainer>
      <CloseButton
        style={style?.closeButton}
        onClick={() => setOpenDialog(false)}
      >
        <IconButton>
          <Close sx={{ ...style?.closeButtonIcon }} />
        </IconButton>
      </CloseButton>
    </StyledDialog>
  );
};

export { Dialog, DialogButton, DialogContainer };
