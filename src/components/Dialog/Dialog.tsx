import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import './Dialog.css';

interface DialogProps {
  openDialog: boolean;
}

import { auth } from '../../config/firebase';

const Dialog = ({ openDialog }: DialogProps) => {
  const googleAuthProvider = new GoogleAuthProvider();

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

  return (
    <div className='dialog'>
      {auth.currentUser ? (
        <div className='dialog-auth'>
          Hello {auth.currentUser?.displayName}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className='dialog-not-auth'>
          <span>Login</span>

          <div className='google-sign-in-btn' onClick={handleSignIn}>
            <img src='/google.svg' />
            <span>Sign in with Google</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog;
