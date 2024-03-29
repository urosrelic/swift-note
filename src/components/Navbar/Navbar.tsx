import { useMediaQuery } from '@uidotdev/usehooks';
import { useState } from 'react';
import { GridProps } from '../../utils/GridProps';
import Drawer from '../Drawer/Drawer';
import './Navbar.css';

import { useEffect } from 'react';

const Navbar = ({ gridView, setGridView }: GridProps) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const layoutButtonVisible = useMediaQuery(
    'only screen and (min-width: 452px)'
  );

  const layoutViewIconPath = gridView ? '/list_view.svg' : '/grid_view.svg';

  const handleLayoutChange = () => {
    setGridView?.(!gridView);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    openDrawer
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [openDrawer]);

  return (
    <div className='navbar'>
      <div className='navbar-items'>
        <div className='navbar-icon' onClick={handleOpenDrawer}>
          <img src='/menu.svg' className='menu-icon' />
        </div>
        <div className='navbar-search'>
          <input type='text' placeholder='Search your notes' />
        </div>
        {layoutButtonVisible && (
          <div className='layout-view-button' onClick={handleLayoutChange}>
            <img src={layoutViewIconPath} />
          </div>
        )}
        <div className='navbar-icon'>
          <img src='/account.svg' className='account-icon' />
        </div>
        <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      </div>
    </div>
  );
};

export default Navbar;
