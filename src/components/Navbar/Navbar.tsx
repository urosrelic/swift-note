import { useMediaQuery } from '@uidotdev/usehooks';
import { useState } from 'react';
import { GridProps } from '../../types/GridProps';
import Drawer from '../Drawer/Drawer/Drawer';
import './Navbar.css';

import { IconLayoutGrid, IconLayoutList, IconMenu2 } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useSearch } from '../../hooks/useSearch';
import NavbarDialog from './components/NavbarDialog';

const Navbar = ({ gridView, setGridView }: GridProps) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { setSearchTerm } = useSearch();
  const { currentUser, logout } = useAuth();
  const layoutButtonVisible = useMediaQuery(
    'only screen and (min-width: 452px)'
  );

  useEffect(() => {
    openDrawer
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [openDrawer]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleLayoutChange = () => {
    setGridView?.(!gridView);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <div className='navbar'>
      <div className='navbar-items'>
        <div className='navbar-icon' onClick={handleOpenDrawer}>
          <IconMenu2 color='#d3e3fd' className='menu-icon' />
        </div>
        <div className='navbar-search'>
          <input
            type='text'
            onChange={handleSearchChange}
            placeholder='Search your notes'
          />
        </div>
        {layoutButtonVisible &&
          (gridView ? (
            <IconLayoutList
              color='#d3e3fd'
              className='layout-view-button'
              onClick={handleLayoutChange}
            />
          ) : (
            <IconLayoutGrid
              color='#d3e3fd'
              className='layout-view-button'
              onClick={handleLayoutChange}
            />
          ))}
        {currentUser ? (
          <div
            className='navbar-icon'
            onClick={() => setOpenDialog(!openDialog)}
          >
            <img
              src={currentUser.photoURL || '/account.svg'}
              className='account-icon'
            />
          </div>
        ) : null}
        <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        <NavbarDialog
          currentUser={currentUser}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          logout={logout}
        />
      </div>
    </div>
  );
};

export default Navbar;
