import { useState } from 'react';

import { useClickOutside } from '../../hooks/useClickOutside';
import './Fab.css';
import FabOption from './FabOption';

const Fab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const fabIconClassName = isOpen ? 'open' : '';
  const fabOptionsClassName = isOpen ? 'open' : '';

  const domNode = useClickOutside<HTMLDivElement>(setIsOpen);
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
          onClick={() => console.log('Add Clicked')}
        />
        <FabOption
          iconPath='/checklist.svg'
          onClick={() => console.log('Checklist Clicked')}
        />
      </div>
    </div>
  );
};

export default Fab;
