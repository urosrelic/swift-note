import React from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useModal } from '../../hooks/useModal';
import './Modal.css';

const Modal = ({ children }: React.PropsWithChildren) => {
  const { isOpen, closeModal } = useModal();
  const domNode = useClickOutside<HTMLDivElement>(closeModal);

  return (
    <div>
      {isOpen && (
        <div className='modal-overlay'>
          <div className='modal' ref={domNode}>
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
