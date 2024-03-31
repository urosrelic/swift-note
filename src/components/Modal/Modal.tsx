import React from 'react';
import { useModal } from '../../hooks/useModal';
import './Modal.css';

const Modal = ({ children }: React.PropsWithChildren) => {
  const { isOpen, closeModal } = useModal();

  return (
    <div>
      {isOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-content'>{children}</div>
            <div className='close-button' onClick={closeModal}>
              <img src='/close.svg' />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
