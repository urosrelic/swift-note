interface FabOptionProps {
  icon: React.ReactElement;
  onClick: () => void;
}

import React from 'react';
import './FabOption.css';

const FabOption = ({ icon, onClick }: FabOptionProps) => {
  return (
    <div className='fab-option' onClick={onClick}>
      {icon}
    </div>
  );
};

export default FabOption;
