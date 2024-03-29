import { useEffect, useState } from 'react';
import { GridProps } from '../../utils/GridProps';
import Drawer from '../Drawer/Drawer';
import './Navbar.css';

const Navbar = ({ gridView, setGridView }: GridProps) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [layoutBtn, setLayoutBtn] = useState<boolean>(window.innerWidth >= 452);

  const layoutViewIconPath = gridView ? '/list_view.svg' : '/grid_view.svg';

  const handleLayoutChange = () => {
    setGridView?.(!gridView);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    const handleResize = () => {
      setLayoutBtn(window.innerWidth >= 452); // Adjust layout button visibility based on window width
    };

    window.addEventListener('resize', handleResize); // Add event listener for window resize
    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener on component unmount
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

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
          {layoutBtn && (
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

  return <>{mobileLayout()}</>;
};

export default Navbar;
