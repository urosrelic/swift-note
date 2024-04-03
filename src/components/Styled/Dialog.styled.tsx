import React from 'react';
import styled from 'styled-components';
import { useClickOutside } from '../../hooks/useClickOutside';

interface DialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties;
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

  .close-dialog-btn {
    position: absolute;
    padding: 1rem;
    top: 0;
    right: 0;
    cursor: pointer;
    border-radius: 50%;
  }

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
      style={style}
      openDialog={openDialog}
    >
      <DialogContainer style={style}>{children}</DialogContainer>
      <div className='close-dialog-btn' onClick={() => setOpenDialog(false)}>
        <img src='/close.svg' alt='Close' />
      </div>
    </StyledDialog>
  );
};

export { Dialog, DialogButton, DialogContainer };
