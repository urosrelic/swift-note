import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div> Loading....</div>;
  }

  return currentUser !== null ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
