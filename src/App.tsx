import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Notes from './components/Notes/Notes';
import Archived from './pages/Archived/Archived';
import Home from './pages/Home/Home';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  const [gridView, setGridView] = useState<boolean>(true);

  // On reload go to the top of page
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route
              path='/home'
              element={<Home gridView={gridView} setGridView={setGridView} />}
            >
              <Route index element={<Navigate to='/home/notes' />} />
              <Route
                path='/home/notes'
                element={<Notes gridView={gridView} />}
              />

              <Route path='/home/archived' element={<Archived />} />
            </Route>
          </Route>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
