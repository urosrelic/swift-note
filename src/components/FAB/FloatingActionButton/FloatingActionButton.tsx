import { useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import './FloatingActionButton.css';

interface FabProps {
  openModal: (modalType: string) => void;
}

const FloatingActionButton = ({ openModal }: FabProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const domNode = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const fabIconClassName = isOpen ? 'open' : '';

  return (
    <div
      className='fab-container'
      ref={domNode}
    >
      <div
        className='fab-btn'
        onClick={() => {
          openModal('add');
        }}
      >
        <img
          className={`fab-icon ${fabIconClassName}`}
          src='/add.svg'
          alt='FAB Icon'
        />
      </div>
    </div>
  );
};

export default FloatingActionButton;
