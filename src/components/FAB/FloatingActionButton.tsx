import { useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import FabOption from './FabOption';
import './FloatingActionButton.css';

interface FabProps {
  openModal: (modalType: string) => void;
}

const FloatingActionButton = ({ openModal }: FabProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const fabIconClassName = isOpen ? 'open' : '';
  const fabOptionsClassName = isOpen ? 'open' : '';

  const domNode = useClickOutside<HTMLDivElement>(() => setIsOpen(false)); // Close fab options when clicking outside

  return (
    <div className='fab-container' ref={domNode}>
      <div className='fab-btn' onClick={toggleOptions}>
        <img
          className={`fab-icon ${fabIconClassName}`}
          src='/add.svg'
          alt='FAB Icon'
        />
      </div>
      <div className={`fab-options ${fabOptionsClassName}`}>
        <FabOption
          iconPath='/add.svg'
          onClick={() => {
            openModal('add'); // Open the Add modal
            setIsOpen(false); // Close fab options when an option is clicked
          }}
        />
        <FabOption
          iconPath='/checklist.svg'
          onClick={() => {
            openModal('checklist'); // Open the Checklist modal
            setIsOpen(false); // Close fab options when an option is clicked
          }}
        />
      </div>
    </div>
  );
};

export default FloatingActionButton;
