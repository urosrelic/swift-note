import {
  User as FirebaseCurrentUser,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { UserAuthCredentials } from '../utils/types/UserAuthCredentials';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<FirebaseCurrentUser | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log(result);
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAndPasswordSignIn = async ({
    email,
    password,
  }: UserAuthCredentials) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    currentUser,
    loading,
    error,
    handleGoogleSignIn,
    handleEmailAndPasswordSignIn,
    logout,
  };
};
