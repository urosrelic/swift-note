import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Archived from './pages/Archived/Archived';
import Deleted from './pages/Deleted/Deleted';
import Home from './pages/Home/Home';
import LabeledNote from './pages/LabeledNote/LabeledNote';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Notes from './pages/Notes/Notes';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  const [gridView, setGridView] = useState<boolean>(true);

  // * On reload go to the top of page
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

              <Route
                path='/home/archived'
                element={<Archived gridView={gridView} />}
              />
              <Route
                path='/home/deleted'
                element={<Deleted gridView={gridView} />}
              />
              <Route
                path='/home/labeled/:labelId'
                element={<LabeledNote gridView={gridView} />}
              />
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
