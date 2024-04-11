import React from 'react';
import './Tooltip.css';

interface TooltipProps {
  tooltipText: string;
  children?: React.ReactNode;
}

const Tooltip = ({ tooltipText, children }: TooltipProps) => {
  return (
    <div className='tooltip'>
      {children}
      <span className='tooltiptext'>{tooltipText}</span>
    </div>
  );
};

export default Tooltip;
