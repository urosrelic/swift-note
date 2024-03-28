import { useState } from 'react';
import { GridProps } from '../../utils/GridProps';
import Drawer from '../Drawer/Drawer';
import './Navbar.css';

const Navbar = ({ gridView, setGridView }: GridProps) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const layoutViewIconPath = gridView ? '/list_view.svg' : '/grid_view.svg';

  const handleLayoutChange = () => {
    setGridView?.(!gridView);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const mobileLayout = () => {
    return (
      <div className='navbar'>
        <div className='navbar-items'>
          <div className='navbar-icon' onClick={handleOpenDrawer}>
            <img src='/menu.svg' className='menu-icon' />
          </div>
          <div className='navbar-search'>
            <input type='text' placeholder='Search your notes' />
          </div>
          <div className='layout-view-button' onClick={handleLayoutChange}>
            <img src={layoutViewIconPath} className='account-icon' />
          </div>
          <div className='navbar-icon'>
            <img src='/account.svg' className='account-icon' />
          </div>
          <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </div>
      </div>
    );
  };

  return <>{mobileLayout()}</>;
};

export default Navbar;
