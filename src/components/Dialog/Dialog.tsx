import './Dialog.css';

interface DialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

import { useAuth } from '../../hooks/useAuth';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useModal } from '../../hooks/useModal';

const Dialog = ({ openDialog, setOpenDialog }: DialogProps) => {
  const domNode = useClickOutside<HTMLDivElement>(setOpenDialog);
  const { currentUser, handleGoogleSignIn, logout } = useAuth();

  const { openModal } = useModal();

  const dialogClassName = openDialog ? 'dialog show' : 'dialog';

  return (
    <div className={dialogClassName} ref={domNode}>
      {currentUser ? (
        <div className='dialog-container auth'>
          <span className='account-name'>{currentUser?.email}</span>
          <div className='account-image'>
            <img
              src={currentUser.photoURL ? currentUser.photoURL : '/account.svg'}
            />
          </div>
          <div className='account-name'>
            <span>Hi, {currentUser?.displayName}</span>
          </div>
          <div className='dialog-btn profile'>
            <img src='/person.svg' />
            <span>Profile</span>
          </div>
          <div className='dialog-btn logout' onClick={logout}>
            <img src='/logout.svg' />
            <span>Logout</span>
          </div>
        </div>
      ) : (
        <div className='dialog-container'>
          <span className='dialog-text'>Login</span>
          <div className='dialog-btn' onClick={handleGoogleSignIn}>
            <img src='/google.svg' />
            <span>Sign in with Google</span>
          </div>
          <div className='dialog-btn' onClick={openModal}>
            <img src='/email.svg' />
            <span>Sign in with Email</span>
          </div>
        </div>
      )}
      <div
        className='close-dialog-btn'
        onClick={() => setOpenDialog(!openDialog)}
      >
        X
      </div>
    </div>
  );
};

export default Dialog;
