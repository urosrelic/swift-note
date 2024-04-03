import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { useClickOutside } from '../../hooks/useClickOutside';

interface DialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties;
}

const StyledDialog = styled.div<{
  style?: React.CSSProperties;
  openDialog: boolean;
}>`
  /* Dynamic styles */
  ${({ style }) => style && style}

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

  .dialog-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dialog-btn {
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
  }

  .dialog-btn img {
    width: 25px;
    margin-right: 10px;
  }

  .dialog-text {
    font-size: 1.2rem;
    font-weight: 400;
  }

  .close-dialog-btn {
    position: absolute;
    padding: 1rem;
    top: 0;
    right: 0;
    cursor: pointer;
    border-radius: 50%;
  }

  /* AUTH container */
  .dialog-container.auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .account-image {
    margin: 1rem 0;
  }

  .account-image img {
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
}) => {
  const domNode = useClickOutside<HTMLDivElement>(() => setOpenDialog(false));
  const { currentUser, logout } = useAuth();

  const dialogClassName = openDialog ? 'show' : '';

  return (
    <StyledDialog
      className={`dialog ${dialogClassName}`}
      ref={domNode}
      style={style}
      openDialog={openDialog}
    >
      <div className='dialog-container auth'>
        <span className='account-name'>{currentUser?.email}</span>
        <div className='account-image'>
          <img src={currentUser?.photoURL || '/account.svg'} alt='Account' />
        </div>
        <div className='account-name'>
          <span>Hi, {currentUser?.displayName}</span>
        </div>
        <div className='dialog-btn profile'>
          <img src='/person.svg' alt='Profile' />
          <span>Profile</span>
        </div>
        <div className='dialog-btn logout' onClick={logout}>
          <img src='/logout.svg' alt='Logout' />
          <span>Logout</span>
        </div>
      </div>
      <div className='close-dialog-btn' onClick={() => setOpenDialog(false)}>
        <img src='/close.svg' alt='Close' />
      </div>
    </StyledDialog>
  );
};

export default Dialog;
