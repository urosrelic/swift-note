import { IconDotsVertical } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useClickOutside } from '../../../../../hooks/useClickOutside';
import './CustomMenu.css';

interface MenuOptionType {
  optionIcon?: React.ReactElement;
  option?: string;
  menuItemAction: () => void;
}

interface CustomMenuProps {
  options: MenuOptionType[];
}

export const CustomMenu = ({ options }: CustomMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const domNode = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (menuItemAction: () => void) => {
    menuItemAction();
    handleMenuToggle();
  };

  return (
    <div className='custom-menu'>
      <div className='menu-button' onClick={handleMenuToggle}>
        <IconDotsVertical />
      </div>
      {isOpen && (
        <div className='menu-items' ref={domNode}>
          {options.map((option, index) => (
            <div
              key={index}
              className='menu-item'
              onClick={() => handleMenuItemClick(option.menuItemAction)}
            >
              <div className='menu-item-option'>
                {option.optionIcon}
                <span>{option.option}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
