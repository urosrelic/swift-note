import { IconListCheck, IconNote } from '@tabler/icons-react';
import { useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import './FloatingActionButton.css';
import FabOption from './components/FabOption/FabOption';

interface FabProps {
  openModal: (modalType: string) => void;
}

const FloatingActionButton = ({ openModal }: FabProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const domNode = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const fabIconClassName = isOpen ? 'open' : '';
  const fabOptionsClassName = isOpen ? 'open' : '';

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
          icon={<IconNote color='#d3e3fd' />}
          onClick={() => {
            openModal('add'); // Open the Add modal
            setIsOpen(false); // Close fab options when an option is clicked
          }}
        />
        <FabOption
          icon={<IconListCheck color='#d3e3fd' />}
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
