import { useMediaQuery } from '@uidotdev/usehooks';
import { useState } from 'react';
import { GridProps } from '../../utils/types/GridProps';
import Drawer from '../Drawer/Drawer';
import './Navbar.css';

import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Dialog, DialogButton, DialogContainer } from '../Styled/Dialog.styled';

const Navbar = ({ gridView, setGridView }: GridProps) => {
  const { currentUser, logout } = useAuth();

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const layoutButtonVisible = useMediaQuery(
    'only screen and (min-width: 452px)'
  );

  useEffect(() => {
    openDrawer
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [openDrawer]);

  const layoutViewIconPath = gridView ? '/list_view.svg' : '/grid_view.svg';

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
        {currentUser ? (
          <div
            className='navbar-icon'
            onClick={() => setOpenDialog(!openDialog)}
          >
            <img
              src={currentUser.photoURL || 'account.svg'}
              className='account-icon'
            />
          </div>
        ) : (
          <div
            className='navbar-icon'
            onClick={() => setOpenDialog(!openDialog)}
          >
            <img src='/account.svg' />
          </div>
        )}
        <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        <Dialog openDialog={openDialog} setOpenDialog={setOpenDialog}>
          <DialogContainer>
            <span className='account-name'>{currentUser?.email}</span>
            <div className='account-image'>
              <img
                style={{ margin: '1rem', borderRadius: '50%' }}
                src={currentUser?.photoURL || '/account.svg'}
                alt='Account'
              />
            </div>
            <div className='account-name'>
              <span>Hi, {currentUser?.displayName}</span>
            </div>
            <DialogButton>
              <img src='/person.svg' alt='Profile' />
              <span>Profile</span>
            </DialogButton>
            <DialogButton onClick={logout}>
              <img src='/logout.svg' alt='Logout' />
              <span>Logout</span>
            </DialogButton>
          </DialogContainer>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
