import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  // On reload go to the top of page
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/home' element={<Home />} />
          </Route>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
