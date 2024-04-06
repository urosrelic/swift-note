import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, SvgIconProps } from '@mui/material';
import { useState } from 'react';
import './CustomMenu.css';

interface MenuOptionType {
  optionIcon?: React.ReactElement<SvgIconProps>;
  option?: string;
  menuItemAction: () => void;
}

interface CustomMenu {
  options: MenuOptionType[];
}

export const CustomMenu = ({ options }: CustomMenu) => {
  // * States
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // * Handlers
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (menuItemAction: () => void) => {
    menuItemAction();
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        aria-controls='menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id='menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options &&
          options.map((option, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuItemClick(option.menuItemAction)}
            >
              <div className='menu-item-option'>
                {option.optionIcon}
                {option.option}
              </div>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};
