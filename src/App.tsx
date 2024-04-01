import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Landing from './pages/Landing/Landing';

function App() {
  // On reload go to the top of page
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
