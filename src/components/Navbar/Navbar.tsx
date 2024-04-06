import { useMediaQuery } from '@uidotdev/usehooks';
import { useState } from 'react';
import { GridProps } from '../../types/GridProps';
import Drawer from '../Drawer/Drawer/Drawer';
import './Navbar.css';

import { AccountBox, Logout } from '@mui/icons-material';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Dialog, DialogButton, DialogContainer } from '../Styled/Dialog.styled';

const Navbar = ({ gridView, setGridView }: GridProps) => {
  // * States
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // * Hooks
  const { currentUser, logout } = useAuth();
  const layoutButtonVisible = useMediaQuery(
    'only screen and (min-width: 452px)'
  );

  useEffect(() => {
    openDrawer
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [openDrawer]);

  // * Handlers
  const handleLayoutChange = () => {
    setGridView?.(!gridView);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  // * Conditional naming
  const layoutViewIconPath = gridView ? '/list_view.svg' : '/grid_view.svg';

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
        <Dialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          style={{
            closeButtonIcon: {
              color: '#d3e3fd',
            },
          }}
        >
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
            <DialogButton style={{ width: '100%' }}>
              <AccountBox sx={{ marginRight: '0.5rem' }} />
              <span>Profile</span>
            </DialogButton>
            <DialogButton onClick={logout} style={{ width: '100%' }}>
              <Logout sx={{ marginRight: '0.5rem' }} />
              <span>Logout</span>
            </DialogButton>
          </DialogContainer>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
