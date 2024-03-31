import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import './Dialog.css';

interface DialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

import { auth } from '../../config/firebase';
import { useCurrentUser } from '../../hooks/useCurrentUser';

const Dialog = ({ openDialog, setOpenDialog }: DialogProps) => {
  const googleAuthProvider = new GoogleAuthProvider();

  const currentUser = useCurrentUser();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  if (!openDialog) {
    return;
  }

  const dialogClassName = openDialog ? 'dialog show' : 'dialog';

  return (
    <div className={dialogClassName}>
      {currentUser ? (
        <div className='dialog-container auth'>
          <span className='account-name'>{currentUser?.email}</span>

          <div className='account-image'>
            <img
              src={currentUser.photoURL ? currentUser.photoURL : '/account.svg'}
            />
          </div>
          <span className='account-name'>Hi, {currentUser?.displayName}</span>

          <div className='dialog-btn logout' onClick={logout}>
            Logout
          </div>
        </div>
      ) : (
        <div className='dialog-container'>
          <span className='dialog-text'>Login</span>
          <div className='dialog-btn' onClick={handleSignIn}>
            <img src='/google.svg' />
            <span>Sign in with Google</span>
          </div>
          <div className='dialog-btn'>
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
