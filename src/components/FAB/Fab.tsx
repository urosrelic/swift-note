import { useState } from 'react';
import { fabOptions } from '../../utils/FabOptions';

import { useClickOutside } from '../../hooks/useClickOutside';
import './Fab.css';
import FabOption from './FabOption';

interface Option {
  iconPath: string;
  onClick: () => void;
}

const Fab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options: Option[] = fabOptions;

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
        {options.map((option, index) => (
          <FabOption key={index} option={option} />
        ))}
      </div>
    </div>
  );
};

export default Fab;
