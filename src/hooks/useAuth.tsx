import {
  User as FirebaseCurrentUser,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
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
    const unsubscribe = auth.onAuthStateChanged((firebaseCurrentUser) => {
      if (firebaseCurrentUser) {
        setCurrentUser(firebaseCurrentUser);
      } else {
        setCurrentUser(null);
      }
    });

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

  const handleCreateUser = async ({ email, password }: UserAuthCredentials) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
    handleCreateUser,
    handleGoogleSignIn,
    handleEmailAndPasswordSignIn,
    logout,
  };
};
