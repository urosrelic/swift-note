import {
  User as FirebaseCurrentUser,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../config/firebase';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<FirebaseCurrentUser | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseCurrentUser) =>
      firebaseCurrentUser
        ? setCurrentUser(firebaseCurrentUser)
        : setCurrentUser(firebaseCurrentUser)
    );

    return () => unsubscribe();
  }, []);

  const googleAuthProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
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

  return { currentUser, handleGoogleSignIn, logout };
};
