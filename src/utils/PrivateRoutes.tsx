import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../config/firebase';

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseCurrentUser) => {
      if (firebaseCurrentUser) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div> Loading....</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
