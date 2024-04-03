import React from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import './Modal.css';

interface ModalProps {
  closeModalHandler: () => void;
  children: React.ReactNode;
}

const Modal = ({ closeModalHandler, children }: ModalProps) => {
  const domNode = useClickOutside<HTMLDivElement>(closeModalHandler);
  return (
    <div>
      <div className='modal-overlay'>
        <div className='modal' ref={domNode}>
          <div className='modal-content'>{children}</div>
          <div className='close-button' onClick={closeModalHandler}>
            <img src='/close.svg' alt='Close' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
