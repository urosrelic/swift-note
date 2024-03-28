import { useState } from 'react';
import { fabOptions } from '../../utils/FabOptions';

import './Fab.css';
import FabOption from './FabOption';

interface Option {
  label: string;
  iconPath: string;
  onClick: () => void;
}

const Fab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options: Option[] = fabOptions;

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='fab-container'>
      <div className='fab-btn' onClick={toggleOptions}>
        <img className='add-icon' src='/add.svg' />
      </div>
      {isOpen && (
        <div className='fab-options'>
          {options.map((option, index) => (
            <FabOption key={index} option={option} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Fab;
