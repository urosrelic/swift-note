import { IconLogout } from '@tabler/icons-react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  Dialog,
  DialogButton,
  DialogContainer,
} from '../../Styled/Dialog.styled';

interface NavbarDialogProps {
  currentUser: FirebaseUser | null;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => Promise<void>;
}
const NavbarDialog = ({
  currentUser,
  openDialog,
  setOpenDialog,
  logout,
}: NavbarDialogProps) => {
  return (
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
        <div className='account-image'>
          <img
            style={{ margin: '1rem', borderRadius: '50%' }}
            src={currentUser?.photoURL || '/account.svg'}
            alt='Account'
          />
        </div>
        <div className='account-name'>
          <span>
            Hi,{' '}
            {currentUser?.displayName
              ? currentUser?.displayName
              : currentUser?.email}
          </span>
        </div>

        <DialogButton onClick={logout} style={{ width: '100%' }}>
          <IconLogout style={{ marginRight: '0.5rem' }} />
          <span>Logout</span>
        </DialogButton>
      </DialogContainer>
    </Dialog>
  );
};

export default NavbarDialog;
