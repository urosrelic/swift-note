import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import CircularProgress from '../components/CircularProgress/CircularProgress';
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
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          fontSize: '2rem',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <span style={{ color: '#d3e3fd' }}>Loading page</span>
        <CircularProgress />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
