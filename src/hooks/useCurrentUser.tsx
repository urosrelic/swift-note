import { User as FirebaseCurrentUser } from 'firebase/auth'; // Import the CurrentUser type from Firebase
import { useEffect, useState } from 'react';
import { auth } from '../config/firebase';

export const useCurrentUser = () => {
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

  return currentUser;
};
